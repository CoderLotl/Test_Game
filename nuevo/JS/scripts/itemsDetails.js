import { DataAccess } from "../classes/DataAccess.js";
import { urlTarget } from "../config/config.js";

let dataAccess = new DataAccess();
let gameParams;
let gameDetails = false;

document.addEventListener('DOMContentLoaded', async ()=>
{
    GetParamsData("data");
    gameDetails = await GetGameDetails();
    console.log(gameDetails);
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