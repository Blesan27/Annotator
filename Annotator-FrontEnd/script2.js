
var UIController = function(){
    
    domStrings = {
        set_folder_icon :".set_folder_icon",
        add_user_icon : ".add_user_icon",
        back_icon :".back_icon",
        total_user_Section : ".middle_section",
        user_edit_section : ".user_edit_section",
        saveAndUpdate : ".save-update"
    };
    var html = '<div class="users" id="%id%"><div class="username">%_username%</div><div class="phonenumber">%_phonenumber%</div><div class="mail">%_mail%</div><div class="no-of-images">%_noAnnotated%</div><i id="moveToUserEdit" class="ion-more settings"></i></div>'
    
    
    return {
        DomStrings : domStrings,
        updateUsersUi : function(data){
            document.querySelector(domStrings.total_user_Section).innerHTML="";
            console.log(data);
            if(data!=null){
                data.forEach(function(current, index, array){

                    console.log(current);

                    var newHtml = html.replace("%_username%",current.userName);
                    newHtml = newHtml.replace("%_phonenumber%",current.phoneNumber);
                    newHtml = newHtml.replace("%_mail%",current.email);
                    newHtml = newHtml.replace("%id%", "id_"+index);
                    //////noofImages anotated;;;;;;;;;;;;;;;;;;;;;;;;
                    console.log(parseInt(current.noOfImagesAnnotated));
                    newHtml = newHtml.replace("%_noAnnotated%",parseInt(current.noOfImagesAnnotated));

                    document.querySelector(domStrings.total_user_Section).insertAdjacentHTML("afterbegin",newHtml);
                });
            }
            
        }
    }
    
    
}();


var dataController = function(UU){
    
    var data ;
    
    var baseUrl = "http://localhost:8080";
    
    var sendHttpRequest = (method,url,data)=>{
        const promise = new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("theJWT"));
            xhr.responseType = 'json'
            xhr.onload = ()=>{
                resolve(xhr.response);
            };
            xhr.send(JSON.stringify(data));
        });
        return promise;
    }
    
    return {
        getURL : baseUrl,
        getInitialData : function(){
            sendHttpRequest("GET",baseUrl+"/users").then(response =>{
                console.log(response);
                data = response;
                UU.updateUsersUi(response);
                return response;
            })
        },
        getUserById: function(id){
            var int_id = parseInt(id.split("_")[1]);
            console.log(int_id)
            return data[int_id];
        },
        update_save : function(user){
            sendHttpRequest("POST",baseUrl+"/users",user).then(response =>{
                console.log(response);
            })
        },
        delete_user : function(user){
            sendHttpRequest("DELETE",baseUrl+"/users",user).then(response =>{
                console.log(response);
            })
        },
        uploader : function(folder){
            sendHttpRequest("POST",baseUrl+"/upload",folder).then(response =>{
                console.log(response);
            })
        },      
    }
}(UIController);




var appController = function(dataCtrl,UICtrl){
    
    var LoadData = function(){
        var initdata = dataCtrl.getInitialData();
        
        
    }
    
    var setFields = function(userName, email,firstName, lastName,phoneNumber,dob,password,r){
        document.querySelector(".UN").value = userName;
        document.querySelector(".E").value = email;
        document.querySelector(".FN").value = firstName;
        document.querySelector(".LN").value = lastName;
        document.querySelector(".PN").value = phoneNumber;
        document.querySelector(".DOB").value = dob;
        if(dob){
            document.querySelector(".DOB").value = dob.slice(0,10);
        }
        document.querySelector(".P").value = password;
        document.querySelector(".opt").value = r;
    }
    var clearFields = function(){
        var r = null;
            document.querySelector(".UN").value = r;
            document.querySelector(".E").value = r;
            document.querySelector(".FN").value = r;
            document.querySelector(".LN").value = r;
            document.querySelector(".PN").value = r;
            document.querySelector(".DOB").value = r;
            document.querySelector(".P").value = r; 
            document.querySelector(".opt").value = "User";
        localStorage.removeItem("BI_ID");
    }
    var SetUpEventListeners = function(){
        DomStringsHere = UICtrl.DomStrings;
        document.querySelector(DomStringsHere.add_user_icon).addEventListener("click",function(){
            var middle_sec = document.querySelector(DomStringsHere.total_user_Section);
            
            var user_sec = document.querySelector(DomStringsHere.user_edit_section);
            
            middle_sec.style.display = "none"
            user_sec.style.display = "block";
            
            document.querySelector(DomStringsHere.add_user_icon).style.display = "none";
            
            document.querySelector(DomStringsHere.back_icon).style.display = "inline-block";
            
        });
        
         document.querySelector(DomStringsHere.back_icon).addEventListener("click",function(){
            var middle_sec = document.querySelector(DomStringsHere.total_user_Section);
            
            var user_sec = document.querySelector(DomStringsHere.user_edit_section);
            
            middle_sec.style.display = "block"
            user_sec.style.display = "none";
            document.querySelector(".deleteButton").style.display="none";
            
            document.querySelector(DomStringsHere.add_user_icon).style.display = "block";
             clearFields();
             dataCtrl.getInitialData();
        });
        
        document.querySelector(DomStringsHere.set_folder_icon).addEventListener("click",function(event){
            if(event.target.id == "setFolder"){
//                var folder = prompt("NOTE: Enter the PATH of the Image directory in which the SERVER is RUNNING");
//                console.log(folder);
                document.querySelector(".uploadForm").style.display = "block"
                
            }
                
        });
        
        
        document.querySelector(DomStringsHere.total_user_Section).addEventListener("click",function(event){
            document.querySelector(".uploadForm").style.display = "none"
            if(event.target.id == "moveToUserEdit"){
                console.log(event.target.parentNode.id);
                var user = dataCtrl.getUserById(event.target.parentNode.id);
                console.log(user);
                
                var middle_sec = document.querySelector(DomStringsHere.total_user_Section);
                var user_sec = document.querySelector(DomStringsHere.user_edit_section);
                middle_sec.style.display = "none"
                user_sec.style.display = "block";
                document.querySelector(DomStringsHere.add_user_icon).style.display = "none";
                document.querySelector(DomStringsHere.back_icon).style.display = "inline-block";
                setFields(user.userName, user.email, user.firstName, user.lastName, user.phoneNumber, user.dob, user.password, user.role);
                localStorage.setItem("BI_ID",user._id);
                document.querySelector(".deleteButton").style.display="block";
                
            }
        });
        
        console.log(document.querySelector(DomStringsHere.user_edit_section));
        document.querySelector(DomStringsHere.user_edit_section).addEventListener("click",function(event){
            document.querySelector(".uploadForm").style.display = "none"
            if(event.target.id == "save-update"){
                console.log(event.target);
                var user = {}
                user.userName = document.querySelector(".UN").value;
                user.email = document.querySelector(".E").value;
                user.firstName = document.querySelector(".FN").value;
                user.lastName = document.querySelector(".LN").value;
                user.phoneNumber = document.querySelector(".PN").value;
                user.dob = document.querySelector(".DOB").value;
                user.password = document.querySelector(".P").value;
                user.role = document.querySelector(".opt").value;
                user._id = localStorage.getItem("BI_ID");
                console.log(user);
                dataCtrl.update_save(user);
                clearFields();
            }
            else if(event.target.id = "delete_button" && event.target.style.display == "block"){
                console.log("pressseed")
                var user = {}
                user.userName = document.querySelector(".UN").value;
                user.email = document.querySelector(".E").value;
                user.firstName = document.querySelector(".FN").value;
                user.lastName = document.querySelector(".LN").value;
                user.phoneNumber = document.querySelector(".PN").value;
                user.dob = document.querySelector(".DOB").value;
                user.password = document.querySelector(".P").value;
                user.role = document.querySelector(".opt").value;
                user._id = localStorage.getItem("BI_ID");
                dataCtrl.delete_user(user);                                        //   DELETE AND UPDATE ID
                clearFields();
            }
        })
        
        
        
        
        
    }
    
    
    
    return {
        init : function(){
            SetUpEventListeners();
            LoadData();
        }
    }
    
}(dataController,UIController)


window.onload = function() {
    if(!localStorage.getItem("theJWT")){
        location.href = "index.html"
    }
}
appController.init();

onSubmit = function(formElement){
    
    console.log("submitted")
    var inp = document.querySelector("input[type='file']")
    
    
    const files = document.querySelector('[type=file]').files
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        console.log(file.name)
        
        
        var idxDot = file.name.lastIndexOf(".") + 1;
        var extFile = file.name.substr(idxDot, file.name.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "svg" || extFile == "gif") {
           //do whatever want to do
             formData.append('files', file)
        } else {
             alert("Only jpg/jpeg, png, gif and svg files are allowed!");
        }

        
       
    }
    
    var sendHttpRequest = (method,url,fm)=>{
        const promise = new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
//            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("theJWT"));
            xhr.responseType = 'json';
            xhr.onload = ()=>{
                resolve(xhr.response);
            };
            
            xhr.send(fm);
        });
        return promise;
    };
    
    sendHttpRequest("POST",dataController.getURL+"/upload",formData).then(response =>{
        console.log(response)
    });
    
    return false;
}
























