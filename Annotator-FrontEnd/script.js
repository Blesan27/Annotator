//Backend Controller////////////////////////////////////////////////////
var backendController = function(){
    
    var baseUrl = "http://localhost:8080";
    
    var sendHttpRequest = (method,url,datar)=>{
        const promise = new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
//            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("theJWT"));
            xhr.setRequestHeader("name",datar.name);
            xhr.setRequestHeader("quality",datar.quality);
            xhr.setRequestHeader("label",datar.label)
            xhr.responseType = 'json';
            xhr.onload = ()=>{
                resolve(xhr.response);
            };
            var fm = new FormData();
//            fm.append("name","demo");
            fm.append("im",datar.blob);
            xhr.send(fm);
        });
        return promise;
    };
    
    return {
        getBaseUrl : baseUrl,
        
        getImage : function(){
            
            
            var sendRequest = (method,url)=>{
                const promise = new Promise((resolve, reject)=>{
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, url);
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("theJWT"));
                    xhr.responseType = 'json';
                    xhr.setRequestHeader("userName",localStorage.getItem("BI_USERNAME"))
                    xhr.onload = ()=>{
                        resolve(xhr.response);
                    };
                    xhr.send();
                });
                return promise;
            };
            
            sendRequest("GET",baseUrl+"/getImage").then(response=>{
                console.log(response);
                console.log(response.image)
                
                //document.getElementById("image_1").src =  response.image;
            });
            
        },
        saveImages : function(labelImage){
            var obj = {}
            obj.label = labelImage.label;
            obj.image = labelImage.blob;
            obj.quality = labelImage.quality;
            obj.name = labelImage.name;
            sendHttpRequest("POST",baseUrl+"/save",labelImage).then(response=>{
                console.log(response);
            });
        }
    }
    
}();











//UI CONTROLLER/////////////////////////////////////////////////////////
var UIController = function(){    
    var DomStrings = {
        add__label_name : "#label_name",
        add__button : ".button_add",
        total_labels : ".total__labels",
        labels_name : ".label",
        final_save :".final_save_button"
    }
    
    
    return {
        
        updateLeft : function(l){
            document.getElementById("left").innerHTML = l;
        },
        setUserName : function(username){
            document.getElementById("username__").innerHTML = username;
        },
        getDomStrings : DomStrings,
        getAddLabelInput : function(){
            var field = document.querySelector(DomStrings.add__label_name);
            var label_name = field.value;
            field.value="";
            field.blur();
            return label_name;
        },
        addLabelOptions : function(label){
            var selectOptions = document.querySelectorAll("#label");
            
            var fields = Array.prototype.slice.call(selectOptions);
            
            
            
            fields.forEach(function(current, index,array){
                var options = new Option(label,label);
                current.add(options,undefined);
            });
            
        },
        deletePanel : function(panelId){
            var r=document.getElementById(panelId);
            console.log(r);
            r.animate([
                {width : '19%'},
                {width : '0%'}
            ],{
                duration:502
            });
            
            setTimeout(()=>{
                r.parentNode.removeChild(r);
            }, 500);
            
        },
        changeSaveIconColor: function(panelId){
            var icn = document.querySelector("#"+panelId+" .ion-ios-checkmark");
            icn.classList.add("green_save_button");
        },
        
        getPanelInputs : function(panelId){
            var panel = document.getElementById(panelId);
            var children = panel.childNodes;
            var id = panelId.split("_")[1]
            var childArray = Array.prototype.slice.call(children);
            
            var label,name,quality,image;
            
            childArray.forEach(function(current, index, array){
                console.log(current.id,index);
                if(current.id == "label"){
                    label = current.value;
                }else if(current.id == "input_name"){
                    name = current.value;
                }else if(current.id == "quality"){
                    quality = current.value;
                }else if(current.id == ("preview_"+id)){
                    console.log(current);
                    var canvas = document.querySelector("#"+current.id+" .demo");
                    var ctx=canvas.getContext("2d");
                    var url = canvas.toDataURL();
                    var newImg = document.createElement("img"); // create img tag
                    newImg.src = url;
                    //document.body.appendChild(newImg);
                    image = newImg;
                }
            });
            
            return [label,name,quality,image];
        }
    }
    
}();





























//DATA CONTROLLER
var dataController = function(back,UU){
    
    var Labeled_Images = function(label, name, quality, image, blob){
        this.label = label;
        this.image = image;
        this.quality = quality;
        this.name = name;
        this.blob = blob;
    };
    
    var data= {
        allImages:[],
        declaredLabels:["human", "vechicle"],
        labeled_images:[],
        username : "blesan"
    };
    
    
    return {
        getUsername : function(){
            data.username = localStorage.getItem("BI_USERNAME");
            return data.username;
        },
        addLabel: function(label){
            data.declaredLabels.push(label);
        },
        getAllLabels : function(){
            return data.declaredLabels;
        },
        addLabelledImages : function(panelInput){
            var blob_returned; 
            var demofunction = function() {
                 fetch(panelInput["3"].src)
                     .then(function (response) {
                     return response.blob();
                 }).then(function (blob) {
                     console.log(blob);
                     blob_returned = blob;
                     console.log(blob_returned);
                    lI = new Labeled_Images(panelInput["0"], panelInput["1"], panelInput["2"], panelInput["3"], blob_returned)
                    data.labeled_images.push(lI);
                 });
            }
            
            demofunction();
//            console.log(blob_returned);
//            lI = new Labeled_Images(panelInput["0"], panelInput["1"], panelInput["2"], panelInput["3"], blob_returned)// [label,name,quality,image];
//            data.labeled_images.push(lI);
            
        },
        saveall:function(){
            data.labeled_images.forEach(function(current,index,array){
                console.log(current);
                back.saveImages(current);
            });
            data.labeled_images = [];
        },
        getDemoImage : function(){
            
             var sendDemoRequest = (method,url)=>{
                const promise = new Promise((resolve, reject)=>{
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, url);
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("theJWT"));
                    xhr.responseType = 'arraybuffer';
                    xhr.setRequestHeader("userName",localStorage.getItem("BI_USERNAME"))
                    
                    xhr.onload = function( e ) {
                        console.log(xhr.response);
                        var arrayBufferView = new Uint8Array( xhr.response );
                        console.log(arrayBufferView)
                        var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                        console.log(blob)
                        var urlCreator = window.URL || window.webkitURL;
                        console.log(urlCreator)
                        var imageUrl = urlCreator.createObjectURL( blob );
                        console.log(imageUrl)
//                        var img = document.querySelector( "#photo" );
//                        img.src = imageUrl;
                        resolve(imageUrl);
                    };
                    
                    xhr.send();
                });
                return promise;
            };
            
            sendDemoRequest("GET",back.getBaseUrl+"/demo").then(response =>{
                console.log(response)
                var img = document.querySelector( "#photo" );
                img.src = response;
            })
            
            
        },
        getImagesLeft : function(){
            
            
            
            var sendRemainingRequest = (method,url)=>{
                const promise = new Promise((resolve, reject)=>{
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, url);
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("theJWT"));
                    xhr.responseType = 'json';
                    xhr.setRequestHeader("userName",localStorage.getItem("BI_USERNAME"))
                    
                    xhr.onload = ()=>{
                        resolve(xhr.response);
                    };
                    xhr.send();
                });
                return promise;
            };
            
            sendRemainingRequest("GET",back.getBaseUrl+"/left").then(response=>{
                console.log(response)
                UU.updateLeft(response.left);
            })
            
            
        },
        testData: function(){
            console.log(data);
        }
    }
    
}(backendController,UIController);





//App Controller///////////////////////////////////////////////////////
var appController = function(dataCtrl,UICtrl,backendCtrl){
    
    var DomStrings = UICtrl.getDomStrings;
    
    var id = 1;
    
    var createNewPanel = function(canvas){
        //append new panel and add the canvas;
        var html = '<div class="label__sections" id="panel_%id%">\
                        <select class="label_selector" id="label">\
                        </select>\
                        <input class="label_selector addlabel" id="input_name" type="text" placeholder="..name"style="padding:5px;">\
                        <select class="label_selector" id="quality">\
                            <option value="good" selected>Good</option>\
                            <option value="bad">Bad</option>\
                        </select>\
                        <button class="btn" id="delete"><i class="ion-ios-close delete_icon_button"></i></button><button class="btn" id="save"><i class="ion-ios-checkmark save_button"></i></button>\
                        <div class="preview_cropped" id="preview_%preview_id%"></div>\
                    </div>';
        
        var newHtml = html.replace("%id%", ''+id);
        
        newHtml = newHtml.replace("%preview_id%", ''+id);
        
        document.querySelector(DomStrings.total_labels).insertAdjacentHTML('afterbegin',newHtml);
        
        document.querySelector("#preview_"+id).appendChild(canvas);
        
        var children = document.querySelector("#panel_"+id).childNodes;
        
        var childes = Array.prototype.slice.call(children);
        var allLabels = dataCtrl.getAllLabels();
        
        childes.forEach(function(current,index,array){
            if(current.id === "label"){
                allLabels.forEach(function(c,i,a){
                    var options = new Option(c,c);
                    current.add(options,undefined);
                });
            }
        });
        
        id += 1 ;
        
    };
    
    var initializeAllLabels = function(){
            var allLabels = dataCtrl.getAllLabels();
            
            for(var i =0; i < allLabels.length ; i++){
                UICtrl.addLabelOptions(allLabels[i]);
            }
            
    }
    
    return {
        init : function(){
            var image = document.getElementById('image');
            var cropper = new Cropper(image, {
                crop(event) {
                },
                viewMode:1
            });
            
            initializeAllLabels();
            
            UICtrl.setUserName(dataCtrl.getUsername());
            
            ////////Event Listeners//---------------
            document.addEventListener("keypress", function(event){
                //console.log(event.target);
                if(event.keyCode===13 || event.which === 13){
                    ///Add Label if focus in labelname;
                    if(event.target.id == "label_name"){
                        var label = UICtrl.getAddLabelInput();
                        if(label){
                            dataCtrl.addLabel(label);

                            //update the options in labels
                            UICtrl.addLabelOptions(label);
                        }
                    }
                    else{
                        var returned = cropper.getCroppedCanvas();
                        returned.classList.add("demo");

                        createNewPanel(returned);
//                        if(document.querySelector(".preview_cropped").hasChildNodes()){
//                            console.log("trueeeee");
//                        }else{
//                            document.querySelector(".preview_cropped").appendChild(returned);
//                            console.log("added");
//                        }
                        
                    }
                }
            });
            
            document.querySelector(DomStrings.add__button).addEventListener("click",function(){
                
                //add label to the data;
                var label = UICtrl.getAddLabelInput();
                if(label){
                    dataCtrl.addLabel(label);

                    //update the options in labels
                    UICtrl.addLabelOptions(label);
                }
            });
            
            
            document.querySelector(DomStrings.total_labels).addEventListener("click",function(event){
                
                if(event.target.parentNode.id == "save" || event.target.parentNode.id == "delete"){ 
                    var pn =  event.target.parentNode;
                    console.log(pn.id);
                    console.log(pn.parentNode.id);
                    if(pn.id == "delete"){
                        UICtrl.deletePanel(pn.parentNode.id);
                    }else{
                        //get inputs from the ui
                        
                        panelinputs = UICtrl.getPanelInputs(pn.parentNode.id);
                        
                        var icn = document.querySelector("#"+pn.parentNode.id+" .ion-ios-checkmark");
                        
                        if(!icn.classList.contains("green_save_button")){
                            
                            console.log(panelinputs);

                            //update the data to the ctrl
                            dataCtrl.addLabelledImages(panelinputs);

                            //change the icon color
                            UICtrl.changeSaveIconColor(pn.parentNode.id);
                        }
                    }
                    
                }
                
            });
            
            document.addEventListener("click",function(event){
                // get the id of the event
                var source_img = event.target.src;
               
                //change the cropping canvas
                if(source_img){
                    cropper.replace(source_img);
                }
            });
            
            document.querySelector(DomStrings.final_save).addEventListener("click", function(event){
                dataCtrl.saveall();
            });
            document.querySelector(".logout__button").addEventListener("click",function(){
                console.log("pressededdddddddd");
                localStorage.setItem("theJWT",null);
                location.href = "index.html"
            });
            document.querySelector(".next_Image").addEventListener("click",function(event){
                dataCtrl.getDemoImage();
                dataCtrl.getImagesLeft();
            });
        }
    }
    
    
}(dataController,UIController,backendController);



appController.init();
dataController.getDemoImage();
dataController.getImagesLeft();
window.onload = function() {
    if(!localStorage.getItem("theJWT")){
        location.href = "index.html"
    }
    else{
        
    }
}



/*
<div class="label__sections">
                        <select class="label_selector" id="label">
                            <option value="vehicle" selected>vehicle</option>
                            <option value="human">human</option>
                        </select>
                        <input class="label_selector addlabel" type="text" id="label_added-3" placeholder="..name"style="padding:5px;">
                        <select class="label_selector" id="quality">
                            <option value="good" selected>Good</option>
                            <option value="bad">Bad</option>
                        </select>
                        <button class="btn"><i class="ion-ios-close delete_icon_button"></i></button>
                        <div class="preview_cropped"></div>
                    </div>
*/













