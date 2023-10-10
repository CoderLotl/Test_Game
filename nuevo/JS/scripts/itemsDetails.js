import { GetDollarValue } from "../services/APIDolar.js"; // Import of the API-consuming function.
import { DataAccess } from "../classes/DataAccess.js";
import { urlTarget } from "../config/config.js";

let dataAccess = new DataAccess();
let gameParams;
let gameDetails = false;
let valorDolar;

document.addEventListener('DOMContentLoaded', async ()=>
{
    valorDolar = await GetDollarValue();
    GetParamsData("data");
    gameDetails = await GetGameDetails();    
    DrawDetails();
});

function GetParamsData(name)
{
    let params;

    var regex = new RegExp("[?]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.search);
    if (!results || !results[2])
    {
        params = false;
    }
    params = decodeURIComponent(results[2].replace(/\+/g, " "));

    if(params !== false)
    {
        gameParams = JSON.parse(params);
    }
}

async function GetGameDetails()
{
    let game = await dataAccess.RetrieveGamesLite(urlTarget, gameParams);
    if(game !== false)
    {
        return game;
    }
    return false;
}

function DrawDetails()
{
    let gameImg = document.getElementById('gamePicture');
    gameImg.src = `../Data/consoles/${gameDetails.console}/${gameDetails.folder}/${gameDetails.folder}1Principal.jpg`;

    document.getElementById('gameTitle').textContent = gameDetails.name;    
    if(valorDolar !== false)
    {
        let arsPrice = gameDetails.price * valorDolar;
        document.getElementById('gamePrice').textContent = `(AR$) ${arsPrice}`;
    }
    else
    {
        document.getElementById('gamePrice').textContent = `(U$) ${gameDetails.price}`
    }
}