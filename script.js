async function getCountry(name){
    const url = `https://restcountries.com/v3.1/name/${name}`
    try {
        const response = await fetch(url);
        if (!response.ok){
            error = document.createElement('error');
            error.innerHTML=`
            <ul>
                <label>Country not found</label>
                </ul>
            `
            document.getElementById("main").appendChild(error);

        }

        const json = await response.json();
        const data = json[0];
    
        const country_info = document.getElementById("country-info");
        capital = (data['capital']);
        population = (data['population']);
        region = (data['region']);
        flag = (data['flags']['png']);


        country_info.innerHTML = `
        <ul>
            <li> Capital :${capital} </li>
            <li> Population:${population} </li>
            <li> Region:${region}</li>
            <img src = ${flag}>
        </ul>`

        borders=data['borders'];
        console.log(borders);
        const bordering = document.getElementById("bordering-countries");

        for (let i =0;i<borders.length;i++){
            const newurl = `https://restcountries.com/v3.1/alpha?codes=${borders[i]}`;
            try {
                const response = await fetch(newurl);
                if (!response.ok){
                    throw new Error('Error message: ${response.status}');
                }
        
                const json1 = await response.json();
                console.log(json1);
                const data1 = json1[0];

                name = data1['name']['common'];
                flag2 = data1['flags']['png'];

                bordercountry = document.createElement(`${name}`);

                bordercountry.innerHTML =`
                <ul>
                    <li> ${name} </li>
                    <img src = ${flag2}>
                    </ul>`

                document.getElementById("bordering-countries").appendChild(bordercountry);
            
        }catch (error){
            console.error(error.message);
        }
        }




    } catch (error){
        console.error(error.message);
    }
}

const button = document.getElementById("submit");
button.addEventListener("click", checkInput = () =>{
    const input =  document.getElementById("country");
    const Country_given = input.value;
    info = getCountry(Country_given);
    console.log(info);
});



