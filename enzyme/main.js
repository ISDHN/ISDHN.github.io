// JavaScript Document
veil = document.getElementById("veil");
current = document.getElementById("start");
messageBoxContent = document.getElementById("messageBox_content");
messageBoxContainer = document.getElementById("messageBox_container");
food = null;
animateEndProc = null

if (window.innerHeight > window.innerWidth) {
	alert("不支持竖屏访问，请横屏访问。");
}

function messageBox_show(content) {
	copy = content.cloneNode(true);
	messageBoxContent.replaceChildren(copy);
	copy.style.display = "block";
	messageBoxContainer.style.display = "block";
}

function messageBox_hide() {
	messageBoxContainer.style.display = "none";
}

function switch_scene(dest) {
	veil.style.display = "block";
	animateEndProc = (event) => {
		switch (event.animationName) {
			case "fade-in":
				current.style.display = "none";
				current = document.getElementsByClassName("scene")[dest];
				current.style.display = "block";
				veil.className = "fadeout";
				break;
			case "fade-out":
				veil.style.display = "none";
				veil.removeEventListener("animationend", animateEndProc);
				break;
			default:
				break;
		}
	}
	veil.addEventListener("animationend", animateEndProc);
	veil.className = "fadein";
}

function start_click() {
	switch_scene("contents");
}

function guide_click() {
	messageBox_show(document.getElementById("guide"));
}

function food_click(event) {
	select = event.target.id;
	if (select == "noodle1" || select == "noodle2")
		food = "noodles";
	else
		food = select
	switch_scene("mouth");
	selected_food = document.getElementsByClassName("food animate_mouth")[select];
	selected_food.style.animationPlayState = "running";
}

function next_click() {
	next = current.getAttribute("next")
	switch_scene(next);
	chyme = document.getElementById("chyme_" + next);
	chyme.style.animationPlayState = "running";
}

function more_click() {
	messageBox_show(current.getElementsByClassName("detailed_info")[food]);
}

function again_click() {
	switch_scene("contents");
	for (var ani of document.getElementsByClassName("animate")) {
		try {
			ani.style.animationPlayState = "paused";
		}
		catch (e) {
			continue;
		}
	}
}

function answer_click(event) {
	messageBox_show(document.getElementsByClassName("answer_content")[event.target.id]);
}