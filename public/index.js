const listGroup = document.getElementsByClassName('list-group');



const getNotes = async () => {
    const result = await fetch('/api/notes', {
        method: 'GET',
    });
    const json = await result.json();
    return json;
};

const renderNotes=(data)=>{
    const noteLi= document.createElement('li');
    noteLi.classList.add("list-group-item");
    noteLi.setAttribute('id',data.id);
    noteLi.innerText = data.title ;
    listGroup.appendChild(noteLi);
};




const Init =()=>{
    getTerms().then((response) => response.forEach((item) => renderNotes(item)));
    
}


Inti();


    // < li class="list-group-item



{/* <li class="list-group-item" data-note="{&quot;title&quot;:&quot;Groceries&quot;,&quot;text&quot;:&quot;hdhd&quot;,&quot;id&quot;:&quot;704d&quot;}"><span class="list-item-title">Groceries</span><i class="fas fa-trash-alt float-right text-danger delete-note"></i></li>


<li class="list-group-item" data-note="{&quot;title&quot;:&quot;Clean House&quot;,&quot;text&quot;:&quot;shshshs\n&quot;,&quot;id&quot;:&quot;d14a&quot;}"><span class="list-item-title">Clean House</span><i class="fas fa-trash-alt float-right text-danger delete-note"></i></li> */}