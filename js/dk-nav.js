dkNavigator = function(e){
	var dkNavDefs = {
		id: "dk-nav",
		navbtnId: "dk-navbtn",
		navTop: 50
	}
	//control nav id
	if(e.id != undefined)
		if(typeof e.id != "string")
			throw "error: dk-nav undefined id";
	var ele = document.getElementById((e.id == undefined)? dkNavDefs.id: e.id)
	if(ele == undefined)
			throw "error: dk-nav undefined id";
	//control navbtn id
	if(e.navbtnId != undefined)
		if(typeof e.navbtnId != "string")
			throw "error: navbtnId is not valid";
	var navbarEle = document.getElementById((e.navbtnId == undefined)? dkNavDefs.navbtnId: e.navbtnId)
	if(navbarEle == undefined)
			throw "error: navbtnId is not valid";
	//control navTop
	if(e.navTop != undefined)
		if(typeof e.navTop != "number")
			throw "error: navTop is not valid";
	var navTopPx = (e.navTop == undefined)? dkNavDefs.navTop: e.navTop;
	if(navbarEle == undefined)
			throw "error: navTop is not valid";
	//control article section id
	if(e.articleId != undefined)
		if(typeof e.articleId != "string")
			throw "error: articleId is not valid";
	var articleEle = document.getElementById(e.articleId)

	//create overlay
	var dkNavOverlay = document.createElement("div");
	dkNavOverlay.setAttribute("id", (e.id + "-overlay"));
	dkNavOverlay.setAttribute("class", "dk-nav-overlay");
	ele.insertAdjacentElement("beforebegin", dkNavOverlay);
	//nav obj
	dkNav = {
		id: e.id,
		el: ele,
		navbarEl: navbarEle,
		overlayEle: dkNavOverlay,
		navTop: navTopPx,
		articleEl: articleEle,
		navHeaderBtn: ele.getElementsByClassName("dk-nav-header-btn")[0],
		toggleCSt(){
			dkNav.el.classList.toggle("cSt");
			dkNav.overlayEle.classList.toggle("cSt");
			if(dkNav.articleEl != undefined)
					dkNav.articleEl.classList.toggle("dk-nav-cSt");
		},
		activeSubLi(){
			var liChilds = this.children;
			for(var i = 0; i < liChilds.length; i++){
				if(liChilds[i].tagName == "UL"){
					liChilds[i].classList.toggle("active");
					break;
				}
			}
		}
		
	};
	//add listeners
	dkNav.navbarEl.addEventListener("click", dkNav.toggleCSt);
	dkNav.overlayEle.addEventListener("click", dkNav.toggleCSt);
	dkNav.navHeaderBtn.addEventListener("click", dkNav.toggleCSt);
	
	//nested links
	var navChilds = dkNav.el.children;
	for(var i = 0; navChilds.length > i; i++){
		if(navChilds[i].tagName == "UL"){
			var ulChilds = navChilds[i].children;
			for(var k = 0; ulChilds.length > k; k++){
				var liChilds = ulChilds[k].children;
				for(var j = 0; liChilds.length > j; j++){
					if(liChilds[j].tagName == "UL"){
						ulChilds[k].classList.add("dk-nav-nested");
						ulChilds[k].addEventListener("click", dkNav.activeSubLi);
					}
				}
			}
		}	
	}
	
	//add style
	var styleEl = document.createElement("style");
	styleEl.innerHTML = ':root{--nav-top: ' + dkNav.navTop + 'px;}';
	document.head.appendChild(styleEl);
}