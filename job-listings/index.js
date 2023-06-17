// All DOM elements
const domElements={
    jobsContainer : document.querySelector('.jobs'),
    searchContainer : document.querySelector('.search'),
    searchFilters : document.querySelector('.search-content'),
    clear : document.querySelector('.clear'),
}



const  getDataFromJson = async ()=>{
    const res = await fetch("./data.json");
    const data = await res.json();

    return data;

};

const createListing = (listing)=>{
    return `
        ${featuredBorder(listing.featured,listing)}
        <h2 class="profile flex">
            <img class="image" src=${listing.logo} alt="logo">
            <div class="company-desc">
                <div class="company-field">
                    <span class="company">${listing.company}</span>
                    ${createNewFlags(listing.new,listing.featured)}
                </div>
                <div class="job-position">${listing.position}</div>
                <div class="job-info flex">
                    <span class="posted info">${listing.postedAt}</span>
                    <ul class="flex">
                        <li class="contract info">${listing.contract}</li>
                        <li class="country info">${listing.location}</li>
                    </ul>
                </div>
            </div>
        </h2>
        <h2 class="skills flex">
            <span class="role filter">${listing.role}</span>
            <span class="level filter">${listing.level}</span>
            ${getLanguages(listing.languages)}
            ${getTools(listing.tools)}
        </h2>
    </div>
    `;
};


const displayListings = () =>{
    let listing="";
    getDataFromJson().then((data) => {
        data.forEach((text)=>{
            listing += createListing(text);
            domElements.jobsContainer.innerHTML=listing;
        });
    })  
};

displayListings();

const featuredBorder = (featured) =>{
    if(featured){
        return `<div class="wrapper flex featured-border">`;
    }

    return `<div class="wrapper flex">`;
};


const createNewFlags = (newFlag,featuredFlag) => {
    let flag="";
    if(newFlag)   flag +=`<span class="new">New!</span>`
    if(featuredFlag) {
        flag +=`<span class="featured">Featured</span>`;
    }
    return flag;
};


const getLanguages = (langs)=>{
    let langCards="";
    langs.forEach((lang)=>{
        langCards += `<span class="lang filter">${lang}</span>`;
    });
    return langCards;
};

const getTools = (tools)=>{
    let toolCards="";
    tools.forEach((tool)=>{
        toolCards += `<span class="lang filter">${tool}</span>`;
    });
    return toolCards;
};


const showSearchSpace = (e) =>{
    let element=e.target;
    if(element.classList.contains('filter')){
        domElements.searchContainer.classList.remove('hidden');
        showFilter(element);
    }
};

let filterArray=[];

const showFilter = (ele) => {
    let filter="";
    if(! filterArray.includes(ele.textContent)){
        filterArray.push(ele.textContent);
    }  

    filterArray.forEach((element) => {
        filter +=`
        <div class="search-filter">
        <span class="filter-content">${element}
        <span class="filter-remove"> &#9747;</span>
        </span>
        </div> 
        `;
        domElements.searchFilters.innerHTML=filter;
        filterJob();
    })

};

const filterJob = (data)=>{
    if(filterArray.length !== 0){
        let listing="";
        getDataFromJson().then((data) => {
            data.forEach((text)=>{
                    if(validJobs(text)){
                    listing += createListing(text);
                    domElements.jobsContainer.innerHTML=listing;
                }
            });
        })  
    }
    else{
        domElements.searchContainer.classList.add('hidden');
        displayListings(data);
    }
} 


const validJobs = (listing) => {
        let isValid = true;
        filterArray.forEach(elem => {
            if( listing.role !== elem && listing.level !== elem && !listing.languages.includes(elem) && !listing.tools.includes(elem)){
                isValid = false;
            }
        })
        return isValid;
}


const removeFilter = (e) => {
    let element = e.target;
    if(element.classList.contains('filter-remove')){
        const elementToRemove=element.parentElement;
        let index = filterArray.indexOf(elementToRemove.textContent.split(" ")[0].trim());
        filterArray.splice(index,1);
        elementToRemove.remove();
        filterJob();
    }
}

const clearSearch = () => {
    domElements.searchContainer.classList.add('hidden');
    filterArray=[];
    filterJob();
}

domElements.jobsContainer.addEventListener('click',showSearchSpace);
domElements.searchFilters.addEventListener('click',removeFilter);
domElements.clear.addEventListener('click',clearSearch);

