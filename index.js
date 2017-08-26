//security.mixed_content.block_active_content
//security.csp.enable
(() => {
   
	var mouseDownEvent = new Event('mousedown', { bubbles: true });
	var lastMessage_Previous = "";

	var resetLastPrevious = function() {
		lastMessage_Previous = "";
	}
	
	var check = function () {
	   
	   
	   console.log("Checking for unread messages...");

	   
	   firstchat = document.querySelector('.unread.chat');
	   
	   if(firstchat == null) {
			console.log("Nothing found!");
			setTimeout(check, 3000);
			return;
	   }
	   
	   var senderDisplayName = firstchat.querySelector('.chat-title').innerText;
	   console.log("Clicking chat from " + senderDisplayName);
	   firstchat.dispatchEvent(mouseDownEvent);
	   var lastMessage = firstchat.querySelector('.last-msg');
	   if(lastMessage != undefined) {
			lastMessage = lastMessage.title;
			if(lastMessage.indexOf("!") >= 0 && lastMessage != lastMessage_Previous) {
				lastMessage_Previous = lastMessage;
				setTimeout(resetLastPrevious, 3500);
				lastMessage = lastMessage.substr(lastMessage.indexOf("!"), lastMessage.length - 1);
		   
				console.log("Command: " + lastMessage);

				setTimeout(() => { 
					
					
					processCommand(firstchat, lastMessage);
					
					
				}, 1000);
		   
			} else {
				//Go Back to the first chat
				setTimeout(() => { 
					document.querySelector('.chat').dispatchEvent(new Event('mousedown', {bubbles:true})); // click another
				}, 1000);
				//check for new messages 3 seconds later
				setTimeout(check, 3000);
			}
	   } else {
		   //check for new messages 3 seconds later
		   console.log("Nothing found!");
			setTimeout(check, 3000);
	   }
	   
	   
	   
	   
	   
	};
	
	setTimeout(check, 3000);
	
	var processCommand = function(chat, command) {
		sendChatMessage(chat, "Command received!");
		
		if(command.indexOf("!ecs") >= 0) {
			setTimeout(function() { console.log("dleay"); sendChatMessage(chat, "Delay test!"); }, 5000); 
		}
		
		if(command.indexOf("!cat") >= 0) {
			cmd_cat(chat);
		}
		
		if(command.indexOf("!dog") >= 0) {
			cmd_dog(chat);
		}
		
	}
	
	
	var sendChatMessage = function(chat, message) {
		
		chat.dispatchEvent(mouseDownEvent);
		
		setTimeout(() => { 
		
			document.querySelector('.input').innerText = message;
			//uievent = document.createEvent("UIEvents");
			//uievent.initUIEvent("input", true, true, window, 1);
			uievent = new UIEvent("input", { bubbles: true, cancelable: true, view: window, detail: 1});
			document.querySelector('.input').dispatchEvent(uievent);
			
						
			setTimeout(() => {
				console.log("Sending Message!");
				document.querySelector('.compose-btn-send').dispatchEvent(new Event('click', {bubbles:true}));
				
				//Go Back to the first chat
				setTimeout(() => { 
					document.querySelector('.chat').dispatchEvent(new Event('mousedown', {bubbles:true})); // click another
				}, 400);
				
				//check for new messages 3 seconds later
				setTimeout(function() { console.log("ok"); check(); }, 3000);
				
			}, 1000);		
					
		}, 1000);
				
		
	}
	
	
	
	var cmd_cat = function(chat) {
		var thechat = chat;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(this.responseText,"text/xml");


				sendChatMessage(thechat, xmlDoc.getElementsByTagName("url")[0].textContent);
			}
		};
		xhttp.open("GET", "http://thecatapi.com/api/images/get?format=xml&type=jpg", true);
		xhttp.send(); 
  
		
	}
	
	var cmd_dog = function(chat) {
		var thechat = chat;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
				data = JSON.parse(this.responseText);


				sendChatMessage(thechat, data.message);
			}
		};
		xhttp.open("GET", "https://dog.ceo/api/breeds/image/random", true);
		xhttp.send(); 
  
		
	}
	
	
})()