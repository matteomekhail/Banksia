import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface MenuItem {
    name: string;
    price?: number;
    description?: string;
    dietaryInfo?: string[];
    options?: string[];
    prices?: {
        small?: number;
        large?: number;
    };
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

const MenuItem: React.FC<MenuItem> = ({ name, price, description, dietaryInfo, options, prices }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">{name}</h4>
            {price !== undefined && <span className="text-lg font-bold">${price.toFixed(2)}</span>}
            {prices && (
                <span className="text-lg font-bold">
                    ${prices.small?.toFixed(2)} / ${prices.large?.toFixed(2)}
                </span>
            )}
        </div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {dietaryInfo && dietaryInfo.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">{dietaryInfo.join(', ')}</p>
        )}
        {options && options.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">Options: {options.join(', ')}</p>
        )}
    </div>
);

const MenuSection: React.FC<MenuSection> = ({ title, items }) => (
    <Card className="mb-6">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <MenuItem {...item} />
                    {index < items.length - 1 && <Separator className="my-2" />}
                </React.Fragment>
            ))}
        </CardContent>
    </Card>
);

interface MenuData {
    [key: string]: MenuItem[];
}

const RestaurantMenu: React.FC = () => {
    const menuData: MenuData = {
        "Breakfast": [
            {
                "name": "Eggs on Toast",
                "price": 14,
                "description": "Sourdough w/ your choice of eggs (scrambled, fried, poached)",
                "dietaryInfo": ["gfo", "v", "h"]
            },
            {
                "name": "Avo Smash",
                "price": 22,
                "description": "On sourdough w/ smashed avo, two poached eggs, feta, cherry tomatoes, haloumi & dukkah w/ basil pesto sauce",
                "dietaryInfo": ["gfo", "v", "h"]
            },
            {
                "name": "Brekkie Burger",
                "price": 20,
                "description": "Fried egg, bacon, haloumi and a hash brown on a brioche bun w/ our house made sauce",
                "dietaryInfo": ["gfo", "vo"]
            },
            {
                "name": "Big Breakfast",
                "price": 30,
                "description": "Two eggs your way on sourdough w/ bacon, chorizo, haloumi, hashbrown, avocado, wilted spinach, grilled tomato & mushrooms w/ labneh",
                "dietaryInfo": ["gfo"]
            },
            {
                "name": "Gourmet Corn Fritters",
                "price": 24,
                "description": "Golden corn fritters accompanied by silky smoked salmon, avocado salsa, poached eggs w/ chipotle sauce",
                "dietaryInfo": ["gf", "v"]
            },
            {
                "name": "Chilli Eggs",
                "price": 24,
                "description": "Fermented chilli oil, scrambled eggs, w/ mushrooms on flatbread",
                "dietaryInfo": ["gfo", "vo"]
            },
            {
                "name": "Omelette",
                "price": 22,
                "description": "Chorizo, shredded cheese & spinach omelette served on pita bread",
                "dietaryInfo": ["gfo", "vo"]
            },
            {
                "name": "Breakfast Tacos",
                "price": 18,
                "description": "Avocado, scrambled eggs w/ bacon, spinach and tomato relish on a soft shell tortilla",
                "dietaryInfo": ["vo"]
            },
            {
                "name": "Garden Harvest Granola Bowl",
                "price": 18,
                "description": "Crispy granola, seasonal fruit, honey, chia seeds on a bed of greek yoghurt",
                "dietaryInfo": ["v", "h"]
            },
            {
                "name": "Eggs Benedict",
                "price": 19,
                "description": "Sourdough toast, two poached eggs, roasted tomato, sautéed mushrooms & spinach w/ hollandaise sauce",
                "dietaryInfo": ["gfo", "v"]
            },
            {
                "name": "Breakfast Bruschetta",
                "price": 18,
                "description": "Avocado, cherry tomatoes, Spanish onion, basil w/ balsamic vinegar served on Turkish bread",
                "dietaryInfo": ["gfo", "v"]
            }
        ],
        "Burgers": [
            {
                "name": "Peri Peri Grilled Chicken",
                "price": 22,
                "description": "Grilled chicken on a brioche bun, lettuce, tomato, tasty cheese, mayo & sweet chilli sauce",
                "dietaryInfo": ["h"]
            },
            {
                "name": "Fried Chicken Burger",
                "price": 22,
                "description": "Fried chicken on a brioche bun, lettuce, tomato, cheese & housemade sauce",
                "dietaryInfo": ["h"]
            },
            {
                "name": "Veggie Burger",
                "price": 21,
                "description": "Corn fritter patty on a brioche bun w/ haloumi, sliced beetroot, spanish onions & tomato relish",
                "dietaryInfo": ["v", "h"]
            },
            {
                "name": "Wagyu Beef Burger",
                "price": 23,
                "description": "Wagyu beef patty on a brioche bun w/ house made sauce, lettuce, tomato, cheese, pickles & caramelised onions",
                "dietaryInfo": ["h"]
            }
        ],
        "Light Meals": [
            {
                "name": "Saganaki Hot Pot",
                "price": 16,
                "description": "Fried Saganaki cheese w/ lemon, honey & oregano served in a hot pot",
                "dietaryInfo": ["gfo"]
            },
            {
                "name": "Burrata",
                "price": 22,
                "description": "Marinated cherry tomatoes, pomegranate, basil oil, balsamic vinegar served w/ pita bread",
                "dietaryInfo": ["gfo", "h"]
            },
            {
                "name": "Grilled Chicken Salad",
                "price": 24,
                "description": "Chargrilled chicken, tomato, avocado, kale, cucumber, crispy wonton, sesame & honey dressing",
                "dietaryInfo": ["gfo", "h"]
            }
        ],
        "Mains": [
            {
                "name": "Pulled Lamb Ragu",
                "price": 24,
                "description": "12 hour slow cooked pulled lamb in Pomodoro sauce w/ pappardelle pasta",
                "dietaryInfo": ["h"]
            },
            {
                "name": "Health Bowl",
                "price": 24,
                "description": "Soba noodles, asparagus, pan seared salmon w/ teriyaki soy sauce",
                "dietaryInfo": ["h"]
            },
            {
                "name": "Beef Skewers",
                "price": 32,
                "description": "Three chargrilled beef skewers served w/ salad, flat bread, tzatziki & a side of crispy chips",
                "dietaryInfo": ["h"]
            },
            {
                "name": "Chicken Skewers",
                "price": 29,
                "description": "Three chargrilled chicken skewers served w/ salad, flatbread, tzatziki & a side of crispy chips",
                "dietaryInfo": ["h"]
            },
            {
                "name": "250g Beef Tenderloin",
                "price": 38,
                "description": "Served w/ peppercorn sauce, chips & a garden salad",
                "dietaryInfo": ["h"]
            }
        ],
        "From The Ocean": [
            {
                "name": "Fish Tacos",
                "price": 22,
                "description": "Three soft shell tortillas w/ coleslaw, pico de gallo, sriracha mayo & lemon"
            },
            {
                "name": "Salt & Pepper Calamari",
                "price": 18,
                "description": "Fried calamari w/ salt & pepper, and a side of aioli"
            },
            {
                "name": "Grilled Fish of the Day",
                "price": 26,
                "description": "Pan-seared fish served w/ crispy chips, seasonal salad & lemon butter sauce",
                "dietaryInfo": ["gfo"]
            }
        ],
        "Savoury Crepes": [
            {
                "name": "Brekkie Crepe",
                "price": 16,
                "description": "Bacon, egg, tasty cheese & BBQ sauce"
            },
            {
                "name": "OG Ham & Cheese",
                "price": 16,
                "description": "Ham & mozzarella cheese"
            },
            {
                "name": "Popeye's",
                "price": 18,
                "description": "Spinach & tasty cheese"
            },
            {
                "name": "Chicken Pesto",
                "price": 20,
                "description": "Grilled chicken pesto w/ tasty cheese"
            },
            {
                "name": "Tuscan Crepe",
                "price": 22,
                "description": "Prosciutto, rocket, mozzarella, & tomatoes"
            }
        ],
        "Pancakes & Waffles": [
            {
                "name": "Traditional Maple Syrup",
                "price": 18,
                "description": "Traditional Canadian maple syrup served w/ vanilla bean gelato"
            },
            {
                "name": "Milk & White Chocolate Duo",
                "price": 22,
                "description": "Our fountain blend of Belgian milk & white chocolate served w/ vanilla bean gelato"
            },
            {
                "name": "Nutella",
                "price": 22,
                "description": "OG Nutella spread w/ a scoop of hazelnut gelato"
            },
            {
                "name": "Snicker-Doodle",
                "price": 22,
                "description": "Snickerdoodle spread with a scoop of salted caramel gelato, topped with peanut crumbing"
            },
            {
                "name": "Pistachio",
                "price": 24,
                "description": "Pistachio spread w/ a serving of pistachio gelato, topped w/ pistachio crumbing"
            },
            {
                "name": "Biscoff",
                "price": 24,
                "description": "Biscoff sauce and white chocolate w/ a scoop of Biscoff gelato, topped w/ Biscoff crumbs and biscuits"
            }
        ],
        "Signature Blends": [
            {
                "name": "Cookies & Cream Dream",
                "price": 15,
                "description": "Oreos blended w/ vanilla ice cream, ice & milk, topped w/ whipped cream, Belgian chocolate & oreo crumbing"
            },
            {
                "name": "Hazelnut Explosion",
                "description": "Nutella blended w/ vanilla ice cream, ice & milk, crowned w/ a luscious Nutella donut"
            },
            {
                "name": "Ultimate Monster",
                "description": "Blend of tim tams, Belgian chocolate, vanilla ice cream, ice & milk, garnished with waffle bits, whipped cream & sprinkles"
            },
            {
                "name": "Snickers Dream",
                "description": "Snickers blended with vanilla ice cream, ice, milk, peanut butter & Belgian chocolate, topped w/ whipped cream & snicker pieces"
            }
        ],
        "Fresh Juices": [
            {
                "name": "Simply Orange / Apple",
                "price": 9,
                "description": "Orange or apple"
            },
            {
                "name": "Green Goodness",
                "description": "Apple, kiwi, cucumber & pineapple"
            },
            {
                "name": "Melon Twist",
                "description": "Watermelon, kiwi & pineapple"
            },
            {
                "name": "Citrus Bliss",
                "description": "Orange, lemon & lime"
            },
            {
                "name": "Sunrise",
                "description": "Watermelon, orange, apple & pineapple"
            }
        ],
        "Smoothies": [
            {
                "name": "Banana Berry Bliss",
                "price": 9,
                "description": "Bananas, mixed berries, greek yoghurt, honey & milk"
            },
            {
                "name": "Oatmeal Delight",
                "description": "Oats, banana, biscoff spread, vanilla protein powder & oat milk"
            },
            {
                "name": "Choc Peanut Powerhouse",
                "description": "Peanut butter, banana, chocolate powder & milk"
            },
            {
                "name": "Tropical Punch",
                "description": "Pineapple, mango, chia seeds, greek yoghurt & milk"
            }
        ],
        "Milkshakes": [
            {
                "name": "Classic Flavors",
                "price": 8,
                "options": ["Chocolate", "Vanilla", "Strawberry", "Banana", "Caramel", "Biscoff", "Pistachio", "Nutella"]
            }
        ],
        "Frappes": [
            {
                "name": "Frappe Flavors",
                "price": 9,
                "options": ["Mocha", "Chocolate", "Chai", "Matcha", "Coffee", "White chocolate", "Biscoff", "Red velvet", "Taro"]
            }
        ],
        "Chillers": [
            {
                "name": "Chiller Flavors",
                "price": 8,
                "options": ["Mango", "Mixed berry", "Strawberry", "Lemon, lime & mint"]
            }
        ],
        "Campos Coffee": [
            {
                "name": "Espresso",
                "price": 3
            },
            {
                "name": "Macchiato/Doppio/Piccolo",
                "price": 3.5
            },
            {
                "name": "Cappuccino",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Latte",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Flat White",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Long Black",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Hot Chocolate",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Chai Latte",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "White Hot Chocolate",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Matcha",
                "prices": {
                    "small": 4.5,
                    "large": 5.5
                }
            },
            {
                "name": "Mocha",
                "prices": {
                    "small": 5.5,
                    "large": 6.5
                }
            },
            {
                "name": "White Mocha",
                "prices": {
                    "small": 5.5,
                    "large": 6.5
                }
            },
            {
                "name": "Dirty Chai",
                "prices": {
                    "small": 5.5,
                    "large": 6.5
                }
            },
            {
                "name": "Belgian Hot Chocolate",
                "prices": {
                    "small": 6,
                    "large": 7
                }
            },
            {
                "name": "Belgian Mocha",
                "prices": {
                    "small": 6.5,
                    "large": 7.5
                }
            },
            {
                "name": "Affogato",
                "price": 6
            },
            {
                "name": "Babycino",
                "price": 1
            }
        ],
        "Teas": [
            {
                "name": "English breakfast",
                "price": 5
            },
            {
                "name": "Green",
                "price": 5
            },
            {
                "name": "Chamomile",
                "price": 5
            },
            {
                "name": "Peppermint",
                "price": 5
            },
            {
                "name": "Earl grey",
                "price": 5
            },
            {
                "name": "Lemon & Ginger",
                "price": 5
            },
            {
                "name": "Chai",
                "price": 5
            }
        ],
        "Specialty Lattes": [
            {
                "name": "Biscoff",
                "prices": {
                    "small": 6,
                    "large": 7
                }
            },
            {
                "name": "Nutella",
                "prices": {
                    "small": 6,
                    "large": 7
                }
            },
            {
                "name": "Pistachio",
                "prices": {
                    "small": 6,
                    "large": 7
                }
            },
            {
                "name": "Red velvet",
                "prices": {
                    "small": 6,
                    "large": 7
                }
            },
            {
                "name": "Taro",
                "prices": {
                    "small": 6,
                    "large": 7
                }
            }
        ],
        "Iced Drinks": [
            {
                "name": "Iced Long Black",
                "price": 7
            },
            {
                "name": "Iced Latte",
                "price": 8
            },
            {
                "name": "Iced Coffee",
                "price": 9
            },
            {
                "name": "Iced Chocolate",
                "price": 9
            },
            {
                "name": "Iced Chai",
                "price": 8
            },
            {
                "name": "Iced Mocha",
                "price": 9.5
            },
            {
                "name": "Iced Matcha",
                "price": 8
            }
        ],
        "Kids Meals": [
            {
                "name": "Kids Juice",
                "price": 7.5,
                "description": "Orange or apple"
            },
            {
                "name": "Kids Milkshake",
                "price": 6
            },
            {
                "name": "2 Slices of Toast",
                "price": 8,
                "description": "Sourdough, white, gluten free, raisin or Turkish w/ your choice of butter, Vegemite, Jam, Nutella or Peanut butter"
            },
            {
                "name": "Nuggets + Chips",
                "price": 12,
                "description": "6 nuggets w/ chippies"
            },
            {
                "name": "Cheeseburger + Chips",
                "price": 12
            },
            {
                "name": "Hot Chips",
                "price": 10
            },
            {
                "name": "Sweet Potato Chips",
                "price": 12
            },
            {
                "name": "Penne Pasta",
                "price": 12,
                "description": "w/ tomato sauce and parmesan cheese"
            },
            {
                "name": "Ham & Cheese Toastie",
                "price": 10
            },
            {
                "name": "Kids Nutella Crepe with Strawberries",
                "price": 14
            },
            {
                "name": "Pancakes",
                "price": 12,
                "description": "w/ strawberries & maple syrup"
            }
        ],
        "Gourmet Crepes": [
            {
                "name": "Biscoff",
                "price": 24,
                "description": "Biscoff sauce & white chocolate w/ a scoop of Biscoff gelato topped with Biscoff crumbs and biscuits"
            },
            {
                "name": "Pistachio",
                "price": 24,
                "description": "Pistachio spread with a scoop of pistachio gelato, topped w/ crumbed pistachio & Persian fairy floss"
            },
            {
                "name": "Kinder Bueno",
                "price": 22,
                "description": "Belgian milk & white chocolate with kinder pieces, served w/ kinder gelato"
            },
            {
                "name": "Cookies & Cream",
                "price": 24,
                "description": "Belgian chocolate served w/ oreo gelato & oreo biscuits"
            }
        ]
    }
    const categories = Object.keys(menuData);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const navigate = (newDirection: number) => {
        setDirection(newDirection);
        setCategoryIndex((prevIndex) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) newIndex = categories.length - 1;
            if (newIndex >= categories.length) newIndex = 0;
            return newIndex;
        });
    };

    const currentCategory = categories[categoryIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]">Banksia Menu</h1>
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold">
                    {currentCategory.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                <button onClick={() => navigate(1)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={categoryIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, type: "tween" }}
                >
                    <Card>
                        <CardContent>
                            {menuData[currentCategory].map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-lg font-semibold">{item.name}</h4>
                                            {item.price !== undefined && <span className="text-lg font-bold">${item.price.toFixed(2)}</span>}
                                            {item.prices && (
                                                <span className="text-lg font-bold">
                                                    ${item.prices.small?.toFixed(2)} / ${item.prices.large?.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                                        {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                                            <p className="text-xs text-gray-500 mt-1">{item.dietaryInfo.join(', ')}</p>
                                        )}
                                        {item.options && item.options.length > 0 && (
                                            <p className="text-sm text-gray-600 mt-1">Options: {item.options.join(', ')}</p>
                                        )}
                                    </div>
                                    {index < menuData[currentCategory].length - 1 && <Separator className="my-2" />}
                                </React.Fragment>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RestaurantMenu;
