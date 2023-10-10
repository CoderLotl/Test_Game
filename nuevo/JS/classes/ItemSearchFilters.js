export class ItemSearchFilters
{
    GetConsoles()
    {
        let selectedConsoles = [];
        if(document.getElementById('pc').checked)
        {
            selectedConsoles.push('PC');
        }
        if(document.getElementById('ps5').checked)
        {
            selectedConsoles.push('PS5');
        }
        if(document.getElementById('xbox').checked)
        {
            selectedConsoles.push('XBOX');
        }
        if(document.getElementById('switch').checked)
        {
            selectedConsoles.push('Switch');
        }

        if(selectedConsoles.length > 0)
        {
            return selectedConsoles;
        }
        else
        {
            return false;
        }
    }

    GetGenre()
    {
        let types = [];
        if(document.getElementById('rpg').checked)
        {
            types.push('rpg');
        }
        if(document.getElementById('mmorpg').checked)
        {
            types.push('mmorpg');
        }
        if(document.getElementById('sim').checked)
        {
            types.push('sim');
        }
        if(document.getElementById('racing').checked)
        {
            types.push('racing');
        }
        if(document.getElementById('platforms').checked)
        {
            types.push('platforms');
        }
        if(document.getElementById('stealth').checked)
        {
            types.push('stealth');
        }
        if(document.getElementById('sports').checked)
        {
            types.push('sports');
        }
        if(document.getElementById('action').checked)
        {
            types.push('action');
        }
        if(document.getElementById('strategy').checked)
        {
            types.push('strategy');
        }
        if(document.getElementById('sandbox').checked)
        {
            types.push('sandbox');
        }
        if(document.getElementById('shooter').checked)
        {
            types.push('shooter');
        }
        if(document.getElementById('horror').checked)
        {
            types.push('horror');
        }

        if(types.length > 0)
        {
            return types;
        }
        else
        {
            return false;
        }
    }

    GetPriceRange()
    {
        let priceRange = [];
        let minPrice = document.getElementById('priceMinInput').value;
        let maxPrice = document.getElementById('priceMaxInput').value;

        (minPrice !== 0 && minPrice !== '') ? priceRange.push(minPrice) : priceRange.push(null); // if(minPrice !== 0 && minPrice !== '') { priceRange.push(minPrice)} else {priceRange.push(null)}
        (maxPrice !== 0 && maxPrice !== '') ? priceRange.push(maxPrice) : priceRange.push(null);
        
        return priceRange; // priceRange [ # / null, # / null];
    }

    GetFilter(searchCriteria)
    {
        let filters = {};

        // NAME FILTER
        if(searchCriteria !== '')
        {
            filters['name'] = searchCriteria;
        }
        
        // CONSOLE FILTER
        let selectedConsoles = this.GetConsoles();
        if(selectedConsoles)
        {
            filters['console'] = selectedConsoles;
            console.log(filters['console']);
        }

        // TYPE FILTER
        let type = this.GetGenre();
        if(type)
        {
            filters['type'] = type;
        }

        // PRICE FILTER
        let price = this.GetPriceRange(); // priceRange [ # / null, # / null];
        filters['price'] = price; // {'price': [ # / null, # / null]};

        return filters;
    }
}