const drinks = [
	{
		title: "Mint lemonade",
		description:
			"Enjoy the zesty freshness of lemons and mint in our homemade lemonade. It's the perfect, refreshing drink for any sunny day.",
		url:
			"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Cold", "Non-Alcoholic", "Seasonal"]
	},
	{
		title: "Moscow Mule",
		description:
			"The Moscow Mule is a zesty cocktail made with spicy ginger beer, smooth vodka, and fresh lime juice. Served in a classic copper mug, it's a refreshing drink with a tangy kick, perfect for any occasion.",
		url:
			"https://images.unsplash.com/photo-1513416543495-10c173ed9908?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Cold", "Alcoholic"]
	},
	{
		title: "Aperol Spriz",
		description:
			"The Aperol Spritz is a vibrant and refreshing cocktail, combining the bittersweet taste of Aperol with sparkling Prosecco and a splash of soda. Garnished with an orange slice, it's the perfect drink to enjoy a taste of summer all year round.",
		url:
			"https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=3338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Cold", "Alcoholic"]
	},
	{
		title: "Cappuccino",
		description:
			"Cappuccino is a classic Italian coffee featuring espresso topped with steamed milk and a frothy foam layer. With its rich aroma and creamy texture, it's a beloved choice for coffee enthusiasts, perfect for any time of day.",
		url:
			"https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Hot", "Non-Alcoholic", "Caffeinated"]
	},
	{
		title: "Hot Chocolate",
		description:
			"Indulge in the comforting warmth of our rich hot chocolate. Made with premium cocoa and steamed milk, it's a delightful treat for any chocolate lover. Perfect for cozying up on chilly days or satisfying your sweet cravings.",
		url:
			"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=3168&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Hot", "Non-Alcoholic"]
	},
	{
		title: "Green Smoothie",
		description:
			"Experience a burst of freshness with our Green Smoothie. Made from spinach, kale, avocado, and pineapple, it's a nutritious powerhouse in a glass. Energize your day with this invigorating blend.",
		url:
			"https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=3450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Cold", "Non-Alcoholic", "Seasonal"]
	},
	{
		title: "Espresso",
		description:
			"Enjoy the bold and intense flavor of our classic Espresso. This rich, full-bodied coffee is crafted from the finest beans and delivers a perfect pick-me-up any time of day. Ideal for true coffee enthusiasts.",
		url:
			"https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=3415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Hot", "Non-Alcoholic", "Caffeinated"]
	},
	{
		title: "Selection of Teas",
		description:
			"Discover our curated selection of teas, featuring classic black, soothing green, and aromatic herbal blends. Each cup offers a unique and delightful experience, perfect for any moment of relaxation.",
		url:
			"https://images.unsplash.com/photo-1504382103100-db7e92322d39?q=80&w=2686&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Hot", "Non-Alcoholic"]
	},
	{
		title: "Pumpkin Spice Latte",
		description:
			"Savor the seasonal delight of our Pumpkin Spice Latte. This cozy beverage blends rich espresso with steamed milk, pumpkin flavors, and a warm mix of spices. Topped with whipped cream and a dash of cinnamon, it's the perfect autumn treat.",
		url:
			"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Hot", "Non-Alcoholic", "Seasonal", "Caffeinated"]
	},
	{
		title: "Gin Tonic",
		description:
			"Experience the crisp and refreshing taste of our classic Gin Tonic. This sophisticated cocktail combines premium gin with tonic water and a twist of lime, creating a perfectly balanced drink. Ideal for any occasion, it's a timeless favorite that never goes out of style.",
		url:
			"https://images.unsplash.com/photo-1597960194480-fc6b5e3181fd?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Cold", "Alcoholic"]
	},
	{
		title: "Home Made Iced Tea",
		description:
			"Indulge in the refreshing simplicity of our homemade iced tea. Freshly brewed tea, lightly sweetened and enhanced with a splash of lemon, creates the perfect thirst-quencher on hot days. Ideal for relaxation and refreshment.",
		url:
			"https://images.unsplash.com/photo-1584351056582-50d8bbb8ea18?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		tags: ["Cold", "Non-Alcoholic"]
	}
];

const drinkContainer = document.querySelector(".drinks");

const tagColors = {
	Cold: "blue",
	"Non-Alcoholic": "green",
	Seasonal: "pink",
	Alcoholic: "red",
	Caffeinated: "yellow",
	Hot: "orange"
};

const drinkSelection = document.querySelector(".tag-selection");

filterDrinks();

drinkContainer.addEventListener("click", function (e) {
	const tagItem = e.target.closest(".drinks__tag");
	if (!tagItem) return;
	const tag = tagItem.textContent;
	highlightTag(tag);
	filterDrinks(tag);
});
drinkSelection.addEventListener("click", function (e) {
	const tagItem = e.target.closest(".drinks__tag");
	if (!tagItem) return;
	const tag = tagItem.textContent;
	if (tagItem.classList.contains("tag-inactive")) {
		highlightTag(tag);
		filterDrinks(tag);
	} else {
		highlightTag();
		filterDrinks();
	}
});

function filterDrinks(tag = "All") {
	if (tag === "All") return printDrinks(drinks);
	const filteredDrinks = drinks.filter((drink) => drink.tags.includes(tag));
	printDrinks(filteredDrinks);
}
function highlightTag(tag = "All") {
	drinkSelection.querySelectorAll("p").forEach((tagSelect) => {
		if (tagSelect.textContent === tag) tagSelect.classList.remove("tag-inactive");
		else tagSelect.classList.add("tag-inactive");
	});
}

function printDrinks(drinkArray) {
	const drinksHtml = "";
	drinkContainer.innerHTML = "";

	drinkArray.forEach((drink) => {
		let tags = "";
		drink.tags.forEach((tag) => {
			const tagHTML = `
                <p class="drinks__tag drinks__tag--${
																	tagColors[tag] ? tagColors[tag] : "grey"
																}">${tag}</p>
            `;
			tags = tags + tagHTML;
		});

		const html = `
            <div class="drinks__item">
                <img src="${drink.url}" alt="Drink">
                <div>
                    <h3>${drink.title}</h3>
                    <p>${drink.description}</p>
                </div>
                <div class="drinks__tags">
                    ${tags}
                </div>
            </div>
        `;

		drinkContainer.insertAdjacentHTML("beforeend", html);
	});
}
