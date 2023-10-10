import { ItemSearchFilters } from "./ItemSearchFilters.js";

/**
 * This class manages the data interactions with the JSON files and provides the necessary functions
 * for processing such data based on external HTML required elements. 
 * @export
 * @class DataAccess
 */
export class DataAccess
{
    constructor()
    {
        this.itemSearchFilters = new ItemSearchFilters();
    }        
        
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
                let filters = this.itemSearchFilters.GetFilter(searchCriteria);
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