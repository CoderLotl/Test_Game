export class ItemSearchManager
{
    // [ ITEM DETAILS ] START
    DrawItemDetailsFront()
    {
        const frame = document.getElementById('frame');
        frame.innerHTML = '';

        const cssFile = document.createElement('link');
        frame.appendChild(cssFile);
        cssFile.rel = 'stylesheet';
        cssFile.href = '../CSS/itemsDetails.css';

        const itemDiv = document.createElement('div');
        frame.appendChild(itemDiv);
        itemDiv.id = 'item';

        const gamePicture = document.createElement('img');
        itemDiv.appendChild(gamePicture);
        gamePicture.id = 'gamePicture';
        gamePicture.src = '../Images/placeholder.png';
        gamePicture.alt = 'A picture of the chosen game';

        const brief = document.createElement('span');
        itemDiv.appendChild(brief);
        brief.id = 'brief';

        const briefContent = document.createElement('div');
        brief.appendChild(briefContent);
        briefContent.id = 'briefContent';
        briefContent.appendChild(document.createElement('h1')).textContent = 'ITEM';
        briefContent.appendChild(document.createElement('h2')).textContent = 'Precio';
        briefContent.appendChild(document.createElement('h3')).textContent = 'Detalles';

        const detailsListSpan = document.createElement('span');
        briefContent.appendChild(detailsListSpan);
        detailsListSpan.id = 'detailsSpan';

        const detailsUL = document.createElement('ul');
        detailsListSpan.appendChild(detailsUL);
        detailsUL.id = 'detailsUL';
        detailsUL.appendChild(document.createElement('li'));
        detailsUL.appendChild(document.createElement('li'));
        detailsUL.appendChild(document.createElement('li'));

        const itemControl = document.createElement('span');
        itemDiv.appendChild(itemControl);
        itemControl.id = 'itemControl';

        const itemControlContent = document.createElement('div');
        itemControl.appendChild(itemControlContent);
        itemControlContent.id = 'itemControlContent';

        const stockData = document.createElement('div');
        itemControlContent.appendChild(stockData);
        stockData.id = 'stockData';

        const buyItemBTN = document.createElement('button');
        itemControlContent.appendChild(buyItemBTN);
        buyItemBTN.id = 'buyItem';
        buyItemBTN.textContent = 'COMPRAR';

        //-------------

        const itemDetails = document.createElement('div');
        frame.appendChild(itemDetails);
        itemDetails.id = 'details';
    }

    // [ ITEM DETAILS ] END

    DrawItemSearchFront()
    {
        const frame = document.getElementById('frame');
        frame.innerHTML = '';

        const cssFile = document.createElement('link');
        frame.appendChild(cssFile);
        cssFile.rel = 'stylesheet';
        cssFile.href = '../CSS/itemsSearch.css';

        const displayContainerDiv = document.createElement('div');
        frame.appendChild(displayContainerDiv);
        displayContainerDiv.id = 'displayContainer';

        const filterDiv = document.createElement('div');
        displayContainerDiv.appendChild(filterDiv);
        filterDiv.id = 'filter';

        // FILTER PANEL 1
        const filterPanel1 = document.createElement('div');
        filterDiv.appendChild(filterPanel1);
        filterPanel1.classList.add('filterPanel');

        filterPanel1.appendChild(document.createElement('h1')).textContent = 'Consola';
        let consoles = ['pc', 'ps5', 'xbox', 'switch'];
        let consolesText = ['PC', 'Playstation 5', 'XBOX', 'Switch'];
        for(let i = 0; i < 4; i++)
        {
            let par = document.createElement('p');
            par.innerHTML = `<input type="checkbox" id="${consoles[i]}"><label>${consolesText[i]}</label>`;
        }        

        // FILTER PANEL 2
        const filterPanel2 = document.createElement('div');
        filterDiv.appendChild(filterPanel2);
        filterPanel2.classList.add('filterPanel');

        filterPanel2.appendChild(document.createElement('h2')).textContent = 'Genero';
        let genres = ['rpg', 'mmorpg', 'sim', 'racing', 'platforms', 'stealth', 'sports', 'action', 'strategy', 'sandbox', 'shooter', 'horror'];        
        let genresText = ['RPG', 'MMORPG', 'Simulacion', 'Plataformas', 'Sigilo', 'Deportes', 'Acción', 'Estrategia', 'Sandbox', 'Shooter', 'Horror'];
        for(let i = 0; i < 12; i++)
        {
            let par = document.createElement('p');
            par.innerHTML = `<input type="checkbox" id="${genres[i]}"><label>${genresText[i]}</label>`;
        }

        // FILTER PANEL 3
        const filterPanel3 = document.createElement('div');
        filterDiv.appendChild(filterPanel3);
        filterPanel3.classList.add('filterPanel');

        const filterPrice = document.createElement('div');
        filterPanel3.appendChild(filterPrice);
        filterPrice.id = 'filterPrice';
        filterPrice.innerHTML = `
            <p>
                Precio<span id="priceTag"></span><img id="dollarInfo" src="../Images/question.png" title="">
            </p>
            <div id="priceSetting">
                <span id="priceMin">
                    $ <input id="priceMinInput" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="Min">
                </span>
                <span id="priceMax">
                    $ <input id="priceMaxInput" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="Max">
                </span>
            </div>`;

            const applyFilter = document.createElement('button');
            filterDiv.appendChild(applyFilter);
            applyFilter.id = 'applyFilter'
            applyFilter.textContent = 'Apply Filter';

            const itemsDisplayDiv = document.createElement('div');
            displayContainerDiv.appendChild(itemsDisplayDiv);
    }
}
