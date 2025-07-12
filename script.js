const BASE_URL = "https://v6.exchangerate-api.com/v6/6b742c7fcd24039b9378ec0a/latest/"
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCountry = document.querySelector(".from select ");
const toCountry = document.querySelector(".to select ")
const btn = document.querySelector("button");
const text = document.querySelector(".msg p");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode === "USD"){
            newOption.selected = "selected";
        } else  if(select.name==="to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}

const getexchangerates = async (fromcurrency,tocurrency,amount) =>{
    const response = await fetch( `${BASE_URL}/${fromCountry.value}`);
    const data = await response.json();
    const rate = data.conversion_rates[tocurrency];
    const convertedAmount = (amount*rate).toFixed(2);
    console.log(`${amount} ${fromcurrency} = ${convertedAmount} ${tocurrency}`)
    return convertedAmount;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
     if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value = 1;
     }
    const convAmt = await getexchangerates(fromCountry.value,toCountry.value,amtVal);
    console.log(convAmt)
    text.innerHTML = `${amtVal} ${fromCountry.value} = ${convAmt} ${toCountry.value}`

})
