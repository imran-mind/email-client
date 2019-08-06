console.log('---running email.js---')
// {
//     id: 1,
//     from: 'imran@gmail.com',
//     to: 'shaikh@gmail.com',
//     subject: 'SENT email 1',
//     text: 'Hi Shaikh this is imran how are you',
//     status: 'SENT',
//     read_status: null
// },
// {
//     id: 2,
//     from: 'nitish@gmail.com',
//     to: 'shaikh@gmail.com',
//     subject: 'SENT email 2',
//     text: 'Hi Shaikh this is imran how are you',
//     status: 'SENT',
//     read_status: null
// },
let emailList = [{
        id: 0,
        from: 'abc@gmail.com',
        to: 'xyz@gmail.com',
        subject: 'INBOX email 2',
        text: 'Hi xyz this is abc how are you',
        status: 'INBOX',
        read_status: 'UN_READ'
    },
    {
        id: 1,
        from: 'dhoni@gmail.com',
        to: 'youvraj@gmail.com',
        subject: 'INBOX email 1',
        text: 'Hi Yuvi this is dhoni how are you',
        status: 'INBOX',
        read_status: 'UN_READ'
    },
    {
        id: 2,
        from: 'vikas@gmail.com',
        to: 'nitish@gmail.com',
        subject: 'DELETED email 1',
        text: 'Hi nitish this is vikas how are you',
        status: 'DELETED',
        read_status: null
    }
]

//  add new button and provide new email temp -> done
//  send email -> done
//  maintain temp array for sent email ->done
// show inbox emails - done
// storing email data into localstorage -> done
// show sent list -> done
// show inboc list -> done
// On click New btn , showing multiple emails templat (restrict with 1 only) -done
// show email right side on click li tag -> done
// send btn functionality and maintaingi data over the list and according to sent,inbox and deleted maintain -> done
// add delete functionality ->  done
// in place of email content dynamically will add email template-> done
// add mark as read functionality
// add mark as unread functionality

let emailContent = document.getElementById('email-temp');
let id = emailList.length + 1;
let openListChecked = new Set();
// let emailList = [];
let travsedEmailList = new Set();
let emailTemp = document.getElementById('email-temp');
let emailParent = document.getElementById('email-parent');
let emailConte = document.getElementById('email-content');
let btnClickedName = 'INBOX';

function onLiTagClick(id) {
    let emailConte = document.getElementById('email-content');
    console.log(' p tag ', emailConte);
    if (emailConte && emailConte.parentNode) {
        console.log(emailConte.parentNode.removeChild(emailConte))
    }
    let eTemplate = document.getElementById('email-template');
    if (eTemplate && eTemplate.parentNode) {
        console.log('removing eTemplate when click on email desc')
        eTemplate.parentNode.removeChild(eTemplate);
    }

    let obj = _.find(emailList, {
        id: id
    });
    if (obj) {
        let emailContent = `<div id='email-content'>
    <lable>To:</lable>
    <h4>s${obj.from}</h4>
    <label>Subject: </label>
    <p> ${obj.subject}</p>
    <p> ${obj.text}</p>
    </div>`;
        emailParent.insertAdjacentHTML('afterbegin', emailContent);
    }
}
function markAsRead() {
    Array.from(openListChecked).forEach((emailId) => {
        setMarkAsReadORUnread(emailId, 'READ');
       emailList = updateStatus(emailId,'READ');
       setLocalStorage(emailList);
       console.log('after that ',emailList);
    });
    // let emailConte = document.getElementById('email-content');
    openListChecked = new Set();
}

function markAsUnRead() {
    Array.from(openListChecked).forEach((emailId) => {
        setMarkAsReadORUnread(emailId, 'UNREAD');
       emailList = updateStatus(emailId,'UNREAD');
       setLocalStorage(emailList);
       console.log('after that ',emailList);
    });
    // let emailConte = document.getElementById('email-content');
    openListChecked = new Set();
}

function updateStatus (id, status){
    let newList = emailList.map((item)=>{
        if(item.id == id){
            item.readStatus = status;
        }
        return item;
    });
    return newList;
}

function updateStatusForDelete (id, status){
    let newList = emailList.map((item)=>{
        if(item.id == id){
            item.readStatus = status;
        }
        return item;
    });
    return newList;
}

function removeFromEmails(id){
    // return list = emailList.filter((item)=>{
    //     if(item.id !== id){
    //         return true;
    //     }
    // });
    // let list = _.remove(emailList, function(n){
    //     console.log(n.id, id);
    //   return  n.id == id;
    // });
    
    let newArr = emailList.map((item)=>{
        if(item.id == id){
            item.status = 'DELETED';
        };
        return item;
    });
    console.log('performing remove -> ',newArr);
    return emailList;
}

function deleteEmails() {
    Array.from(openListChecked).forEach((emailId) => {
       removeElementById(emailId);
       emailList = removeFromEmails(emailId);
       console.log('after that ',emailList);
       setLocalStorage(emailList);
       
    });
    let emailConte = document.getElementById('email-content');
    openListChecked = new Set();
    console.log(' removing email content ', emailConte);
    if (emailConte && emailConte.parentNode) {
        console.log(emailConte.parentNode.removeChild(emailConte))
    }
}

function showInboxEmails() {
    btnClickedName = 'INBOX';
    if (emailList && emailList.length) {
        // removeElements('INBOX');
        removeElementByIds();
        Array.from(emailList).forEach((emailObj) => {
            if (emailObj.status === 'INBOX') {
                showEmails(emailObj);
                travsedEmailList.add(emailObj.id);
            }
        });
    }
}

function showSentEmails() {
    btnClickedName = 'SENT';
    if (emailList && emailList.length) {
        removeElementByIds();
        Array.from(emailList).forEach((emailObj) => {
            if (emailObj.status === 'SENT') {
                showEmails(emailObj);
                travsedEmailList.add(emailObj.id);
            }
        });
    }
}

function showDeleteEmails() {
    btnClickedName = 'DELETED';
    if (emailList && emailList.length) {
        removeElementByIds();
        Array.from(emailList).forEach((emailObj) => {
            if (emailObj.status === 'DELETED') {
                showEmails(emailObj);
                travsedEmailList.add(emailObj.id);
            }
        });
    }
}

function checkedEmailItems(element) {
    if (btnClickedName === 'SENT' || btnClickedName === 'INBOX') {
        if (element.checked) {
            openListChecked.add(element.id);
        } else {
            openListChecked.delete(element.id);
        }
        console.log('openListChecked => ', openListChecked);
    }
}

let emailSection = document.getElementById('email-list');
emailSection.addEventListener('click', function (event) {
    console.log('checkbox -> ', event.target.checked)
    console.log('checkbox -> ', event.target.id);
    checkedEmailItems(event.target);
});


function showEmails(emailData, fromEvent) {
    let readStatus = emailData.readStatus === 'READ' ? 'line-through' : '';
    let emailLi = `<li onclick='onLiTagClick(${emailData.id})' id='${emailData.id}'>
        <input type='checkbox' id='${emailData.id}'>
        <p class='text terms-checkbox' style="text-decoration:${readStatus}" id='${emailData.id}'>${emailData.subject}</p>
    </li>`
    let emailSection = document.getElementById('email-list');
    // if(fromEvent === 'SENT'){
    //     showSentEmails();
    // }
    if (emailData) {
        emailSection.insertAdjacentHTML('afterbegin', emailLi);
    }
}

function removeElementByIds() {
    console.log('removing emails ', );
    emailList.forEach((item) => {
        let element = document.getElementById(item.id);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element)
        }
    });
}

function setMarkAsReadORUnread(id,status) {
    let cssValue = status === 'READ' ? 'line-through' : ''
    let element = document.getElementById(id);
    let paraText = element.children[1];
    let checkbox = element.children[0];
    checkbox.checked = false;
    console.log('******** ',)
    paraText.setAttribute('style',"text-decoration:"+cssValue);
}


function removeElementById(id) {
    let element = document.getElementById(id);
    if (element && element.parentNode) {
        element.parentNode.removeChild(element)
    }
}

function showNewTemplate(e) {
    let eTemplate = document.getElementById('email-template');
    let eContent = document.getElementById('email-content');
    if (eTemplate && eTemplate.parentNode) {
        console.log('removing extra child')
        eTemplate.parentNode.removeChild(eTemplate);
    }
    if (eContent && eContent.parentNode) {
        eContent.parentNode.removeChild(eContent);
    }
    let emailTemplate = `<div id='email-template'>
        <br>To: <input value="" type="text" id="email-to" placeholder="imran@gmail.com">
        Subject: <input value ="" id="email-subject" type="text"><br>
        <textarea id="email-text" placeholder="write an email">
            </textarea><br><br>
        <input type='button' value="Send" id="sent-btn"/>
    </div>`;
    console.log(emailParent);
    emailParent.insertAdjacentHTML('afterbegin', emailTemplate);
    enableSendBtn();
}

function enableSendBtn() {
    let sentBtn = document.getElementById('sent-btn');
    if (sentBtn !== null) {
        sentBtn.addEventListener('click', saveEmail);
    }
}

function saveEmail() {
    let emailTo = document.getElementById('email-to').value;
    let emailSubject = document.getElementById('email-subject').value;
    let emailText = document.getElementById('email-text').value;
    id = id + 1;
    let emailObject = {
        id: id,
        from: 'imran@gmail.com',
        to: emailTo,
        subject: emailSubject,
        text: emailText    ,
        status: 'SENT',
        readStatus: null
    }
    emailList.push(emailObject);
    setLocalStorage(emailList);
    console.log(emailObject);
    if (btnClickedName === 'SENT') {
        showSentEmails();
    }
    // showEmails(emailObject, 'SENT')
}


function setLocalStorage(emails) {
    localStorage.setItem('email-list', JSON.stringify(emails));
}


window.onload = persistingEmails();

function getLocalStorage(){
    return JSON.parse(localStorage.getItem('email-list'));
}
function persistingEmails() {
    // let fakedata = 
    let mergedData = getLocalStorage() == null ? [].concat(emailList) : getLocalStorage().concat(emailList);
    let uniqList = _.uniqBy(mergedData,'id');
    emailList = uniqList;
    setLocalStorage(uniqList);
    console.log('persisting emails',uniqList);
    id = uniqList.length;
}