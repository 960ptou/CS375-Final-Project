// https://www.cde.ca.gov/ci/cr/rl/litrlgenres.asp
const genres = {
    'drama': 1,
    'fable': 1,
    'fairy tale': 1,
    'fantasy': 1,
    'fiction': 1,
    'fictionin verse': 1,
    'folklore': 1,
    'historical fiction': 1,
    'horror': 1,
    'humor': 1,
    'legend': 1,
    'mystery': 1, 
    'mythology': 1, 
    'poetry': 1, 
    'realistic fiction': 1, 
    'science fiction': 1, 
    'short story': 1, 
    'tallTale': 1, 
    'biography': 1, 
    'essay': 1, 
    'narrative nonfiction': 1, 
    'nonfiction': 1, 
    'speech': 1
}

function isSearchByGenre(query){
    return genres[query.toLowerCase()] === 1;
}

function isSearchById(query){
    return Number.parseInt(query) == query; // weak == needed, check only number
}

module.exports.isSearchByGenre = isSearchByGenre;
module.exports.isSearchById = isSearchById;