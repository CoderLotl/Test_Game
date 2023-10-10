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

    document.getElementById('console').textContent = `Consola: ${gameDetails.console}`;
    document.getElementById('type').textContent = `Género: ${gameDetails.type}`;
    document.getElementById('age').textContent = `Edad: ${gameDetails.age}`;

    let details = document.getElementById('details');
    let descriptionTitle = document.createElement('h3');
    details.appendChild(descriptionTitle);
    descriptionTitle.textContent = 'Descripción';
    let description = document.createElement('p');
    details.appendChild(description);
    description.id = 'gameDescription';
    description.textContent = gameDetails.description;

    let videoFrame = document.createElement('div');
    details.appendChild(videoFrame);
    videoFrame.id = 'videoFrame';

    let videoIframe = document.createElement('iframe');
    videoFrame.appendChild(videoIframe);
    //video.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/9AyX2QqPKaY?si=Q8LbXAV0nYciLXqB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    videoIframe.src = `https://www.youtube.com/embed/${gameDetails.yt.split('v=')[1]}`;
    videoIframe.id = 'gameVideo';
    videoIframe.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    videoIframe.setAttribute('frameborder', 0);
    //GetVideoID(gameDetails.yt);
}
