/**
 * This class manages the data interactions with the JSON files and provides the necessary functions
 * for processing such data based on external HTML required elements. 
 * @export
 * @class DataAccess
 */
export class DataAccess
{
    /**
     * Retrieves the whole data of the provided URL. Intended ONLY for .json files.
     * @param {*} url string with the file's path.
     * @return {*} false | Array Returns false on failure, or an array on success.
     * @memberof DataAccess
     */
    async FetchData(url)
    {
        const response = await fetch(url);
        if(response.ok)
        {
            return await response.json();
        }
        else
        {
            return false;
        }
    }

    /**
     * Retrieves a whole array of games from a .json file based on the search criteria and a string with the file's path.
     * Returns an array of objects.
     * @param {*} urlTarget
     * @param {*} searchCriteria
     * @memberof DataAccess
     */
    async RetrieveGames(urlTarget, searchCriteria)
    {
        try
        {
            const data = await this.FetchData(urlTarget);
        
            if(data !== false)
            {                
                let filters = this.GetFilter(searchCriteria);
                let filterFunction = this.FilterData(filters);
                let result = data.filter(filterFunction);
                return result;
            }
        }
        catch(error)
        {
            console.error(error);
            return false;
        }    
    }

    async RetrieveGamesLite(urlTarget, valuesArray)
    {             
        try
        {
            const data = await this.FetchData(urlTarget);            

            if(data !== false)
            {                
                for(let game of data)
                {
                    if(valuesArray.name == game.name)
                    {                        
                        return game;
                    }
                }
            }            
            return false;
        }
        catch(error)
        {
            console.error(error);
        }
    }

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

    FilterData(params)
    {    
        let funct = function(item)
        {
            for(const key in params)
            {
                if(key === 'name')  // WE CHECK IF THE NAME OF THE GAME PARTIALLY MATCHES WITH THE SEARCH STRING
                {
                    let searchValue = params[key].toLowerCase();
                    let itemValue = item[key] ? item[key].toString().toLowerCase() : '';
                    if(!itemValue.includes(searchValue))
                    {
                        return false; // IF IT DOESN'T, THE GAME IS NOT INCLUDED.
                    }
                }
                else if(key === 'price') // WE CHECK IF THERE'S A MIN AND MAX PRICE, AND IF THE GAME'S PRICE IS IN BETWEEN.
                {
                    let [priceMin, priceMax] = params[key];
                    if( (priceMin && item.price < priceMin) || (priceMax && item.price > priceMax) )
                    {
                        return false; // IF IT'S NOT, THE GAME IS NOT INCLUDED.
                    }
                }
                else // WE CHECK FOR THE OTHER KEYS AND THEIR ARRAYS OF VALUES.
                {
                    let selectedConsole = params[key];
                    if(!selectedConsole.includes(item[key]))
                    {
                        return false; // IF A GAME DOESN'T MATCH WITH SOME OF THE VALUES, IT'S NOT INCLUDED.
                    }
                }            
            }
            return true;
        };
        return funct;
    }
}