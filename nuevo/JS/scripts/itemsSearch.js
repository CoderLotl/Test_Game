import { GetDollarValue } from "../services/APIDolar.js"; // Import of the API-consuming function.
import { DataAccess } from "../classes/DataAccess.js";
import { urlTarget } from "../config/config.js";

let dataAccess = new DataAccess();
let searchButton;
let applyFilterButton;
let searchInput;
let searchCriteria;
let valorDolar;

// [ LOAD EVENT ]
document.addEventListener('DOMContentLoaded', async ()=>
{    
    searchButton = document.getElementById('searchButton');
    applyFilterButton = document.getElementById('applyFilter');
    searchInput = document.getElementById('searchInput');

    valorDolar = await GetDollarValue();
    SetPriceTag();

    // SEARCH BUTTON
    searchButton.addEventListener('click', ()=>
    {
        SetCriteria();        
        SearchGames();
    });

    // SEARCH INPUT (SEARCH BAR)
    searchInput.addEventListener('keydown', (e)=>
    {
        if(e.key === "Enter")
        {
            SetCriteria();
            SearchGames();
        }
    });

    // APPLY FILTER BUTTON
    applyFilterButton.addEventListener('click', ()=>
    {
        SetCriteria();
        SearchGames();
    });    
});
// end of [ LOAD EVENT ]

// FUNCTIONS
async function SearchGames()
{
    let displayContainer = document.getElementById('itemsDisplay');
    
    let games = await dataAccess.RetrieveGames(urlTarget, searchCriteria);
    if(games !== false)
    {
        displayContainer.innerHTML = '';
        games.forEach(game =>
        {
            DrawGameArticle(game, displayContainer);
        });
    }
}

function DrawGameArticle(game, displayContainer)
{
    console.log(game.name);
    let wrapper = document.createElement('div');    
    displayContainer.appendChild(wrapper);
    wrapper.classList = 'gameWrapper';
    
    let itemImgDiv = document.createElement('div');
    wrapper.appendChild(itemImgDiv);
    itemImgDiv.classList = 'itemImgDiv';
    let itemBrief = document.createElement('div');
    wrapper.appendChild(itemBrief);
    itemBrief.classList = 'itemBrief';

    let itemImg = document.createElement('img');
    itemImgDiv.appendChild(itemImg);
    itemImg.classList = 'itemImg';
    itemImg.src = `../Data/consoles/${game.console}/${game.folder}/${game.folder}1Principal.jpg`;

    let itemTitle = document.createElement('p');
    itemBrief.appendChild(itemTitle);
    let titleContent = document.createElement('a');
    itemTitle.appendChild(titleContent);
    titleContent.textContent = game.name;
    titleContent.classList = 'titleContent';
    let titleParams = GetURLParams(game);
    titleContent.href = `itemsDetails.html?data=${titleParams}`;

    let itemPrice = document.createElement('h2');
    itemBrief.appendChild(itemPrice);
    itemPrice.classList = 'itemPrice';
    if(valorDolar !== false)
    {
        let arsPrice = game.price * valorDolar;
        itemPrice.textContent = `(AR$) ${arsPrice}`;
    }
    else
    {
        itemPrice.textContent = `(U$) ${game.price}`;
    }
}

function GetURLParams(game)
{
    let gameData = 
    {
        "name": game.name,
        "SKU": game.SKU,
    };

    return encodeURIComponent(JSON.stringify(gameData));
}

function SetPriceTag()
{
    let priceTag = document.getElementById('priceTag');
    let dollarInfo = document.getElementById('dollarInfo');
    if(valorDolar != null)
    {
        let date = new Date();

        let options = { timeZone: 'America/Argentina/Buenos_Aires' };
        let formatter = new Intl.DateTimeFormat('en-US', options);

        formatter.format(date);

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        priceTag.textContent += ' (AR$) ';
        dollarInfo.title = `Paridad dolar al día ${day}/${month}/${year}: U$1 = AR$ ${valorDolar}`;
    }
    else
    {
        priceTag.textContent += ' (U$)';
        dollarInfo.title = `(!) No se pudo conectar con DolarAPI.`;
    }
}

function SetCriteria()
{
    searchCriteria = searchInput.value;
    searchInput.blur();    
}