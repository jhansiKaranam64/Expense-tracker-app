form = document.getElementById('myForm');
itemList = document.getElementById('items');
msg = document.querySelector('.msg');

form.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem);
itemList.addEventListener('click',editItem);
window.addEventListener('load',displayStoredItems);


//addItem function
function addItem(e){
    e.preventDefault();

    var newDes = document.getElementById('name');
    var newAmount = document.getElementById('amount');
    var newCategory = document.getElementById('category');

    if(newDes.value === '' || newAmount.value ===''||newCategory.value ===''){
        console.log('error');
        msg.classList.add('error');
        msg.innerHTML ="Please enter all feilds";
    }else{
        var li = document.createElement('li');
        li.className="list-group-item";
        li.appendChild(document.createTextNode(newDes.value+" : "));
        li.appendChild(document.createTextNode(newAmount.value+" : "));
        li.appendChild(document.createTextNode(newCategory.value));

        var deleteBtn = document.createElement('button');
        deleteBtn.className ="btn btn-danger btn-sm float-right delete";
        deleteBtn.appendChild(document.createTextNode('Delete'));

        var editBtn = document.createElement('button');
        editBtn.classList = "btn btn-primary btn-sm float-right edit";
        editBtn.appendChild(document.createTextNode('Edit'));

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        itemList.appendChild(li);

        var storedData = localStorage.getItem(newDes.value);
        var newUser = {
            description : newDes.value,
            amount : newAmount.value,
            category : newCategory.value
        }
        localStorage.setItem(newDes.value,JSON.stringify(newUser));

        newDes.value = '';
        newAmount.value = '';
        newCategory.value = '';
        
    }
}

//remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are u sure?')){
            var li = e.target.parentElement;
            var itemLis = li.textContent.split(':');
            console.log(itemLis)
            var des = itemLis[0].trim();
            localStorage.removeItem(des);
            itemList.removeChild(li);
        }
    }
}

// editItem function
function editItem(e){
    e.preventDefault();
    if(e.target.classList.contains('edit')){
        
        var newDes = document.getElementById('name');
        var newAmount = document.getElementById('amount');
        var newCategory = document.getElementById('category');

        var li = e.target.parentElement;
        // getting values
        var desElement = li.firstChild;
        var amountElement = desElement.nextSibling;
        var categoryElement = amountElement.nextSibling;
        // to get values in input placeholders
        newDes.value = desElement.textContent.split(':')[0].trim();
        newAmount.value = amountElement.textContent.split(':')[0].trim();
        newCategory.value = categoryElement.textContent;

        // to remove in localStorage
        var itemLis = li.textContent.split(':');
        var des = itemLis[0].trim();
        localStorage.removeItem(des);
        itemList.removeChild(li);
    }
    
}
//displayStoredItems
function displayStoredItems() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage.getItem(key));
        var li = document.createElement('li');
        li.className = "list-group-item";

        var deleteBtn = document.createElement('button');
        deleteBtn.className = "btn btn-danger btn-sm float-right delete";
        deleteBtn.appendChild(document.createTextNode('Delete'));

        var editBtn = document.createElement('button');
        editBtn.classList = "btn btn-primary btn-sm float-right edit";
        editBtn.appendChild(document.createTextNode('Edit'));

        li.appendChild(document.createTextNode(item.description + ": "));
        li.appendChild(document.createTextNode(item.amount + ": "));
        li.appendChild(document.createTextNode(item.category));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        itemList.appendChild(li);
    }
}
//displayStoredItems()