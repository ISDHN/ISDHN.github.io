// JavaScript Document
veil = document.getElementById("veil");
current = document.getElementById("start");
messageBoxContent = document.getElementById("messageBox_content");
messageBoxContainer = document.getElementById("messageBox_container");
select = null
food = null;

if (/Android|webOS|iPhone|iPod|BlackBerry/.test(navigator.userAgent)) {
	alert("不支持移动设备，请使用电脑访问。");
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
	veil.addEventListener("animationend", (event) => {
		switch (event.animationName) {
			case "fade-in":
				current.style.display = "none";
				current = document.getElementsByClassName("scene")[dest];
				current.style.display = "block";
				veil.className = "fadeout";
				break;
			case "fade-out":
				veil.style.display = "none";
				break;
			default:
				break;
		}
	});
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
	switch_scene(current.getAttribute("next"));
}

function more_click() {
	messageBox_show(current.getElementsByClassName("detailed_info")[food]);
}

function again_click() {
	switch_scene("contents");
}

function answer_click(event) {
	messageBox_show(document.getElementsByClassName("answer_content")[event.target.id]);
}