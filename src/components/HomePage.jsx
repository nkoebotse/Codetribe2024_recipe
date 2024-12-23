import  { useState, useEffect } from 'react';
import axios from 'axios';


function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: ''
  });
  const [foods, setFoods] = useState([]); // Updated to fetch from API
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');

  const SPOONACULAR_API_KEY = '89d31250145a4c65adaebaa8fa7c702b';
  const SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

  // Fetch recipes from your local backend
  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  // Fetch featured foods from the Spoonacular API
  useEffect(() => {
    const fetchFoods = async () => {
      setImageLoading(true);
      try {
        const response = await axios.get(SPOONACULAR_API_URL, {
          params: {
            number: 5, // Get 5 food items for the featured list
            apiKey: SPOONACULAR_API_KEY
          }
        });
        if (response.data.results) {
          setFoods(response.data.results); // Set the food data to the state
        } else {
          console.error('No results found for the featured foods.');
        }
      } catch (error) {
        console.error('Error fetching featured foods:', error.message);
        setError('Failed to load featured foods. Please try again later.');
      } finally {
        setImageLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const fetchRecipeImage = async (recipeName) => {
    setImageLoading(true);
    setError('');
    try {
      const response = await axios.get(SPOONACULAR_API_URL, {
        params: {
          query: recipeName,
          number: 1,
          apiKey: SPOONACULAR_API_KEY
        }
      });
      if (response.data.results && response.data.results.length > 0) {
        const imageUrl = response.data.results[0]?.image;
        if (imageUrl) {
          setNewRecipe(prevRecipe => ({ ...prevRecipe, image: imageUrl }));
        } else {
          console.warn('No image found for the recipe');
        }
      } else {
        console.warn('No results found for the query');
      }
    } catch (error) {
      console.error('Error fetching recipe image:', error.message);
      setError('Failed to fetch recipe image. Please check your API key and try again.');
    } finally {
      setImageLoading(false);
    }
  };

  const handleAddRecipe = () => {
    axios.post('http://localhost:5000/recipes', newRecipe)
      .then(response => {
        setRecipes([...recipes, response.data]);
        setNewRecipe({
          name: '',
          ingredients: '',
          instructions: '',
          category: '',
          prepTime: '',
          cookTime: '',
          servings: '',
          image: ''
        });
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  const handleDeleteRecipe = (id) => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Featured Foods</h1>
      <div className="featured-foods">
        {imageLoading ? (
          <p>Loading foods...</p>
        ) : (
          foods.map((food, index) => (
            <div key={index} className="food-item">
              <img src={food.image} alt={food.title} className="food-image" />
              <h2>{food.title}</h2>
            </div>
          ))
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <h1>Recipe List</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => setSearchTerm(searchTerm)}>Search</button>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        onBlur={() => fetchRecipeImage(newRecipe.name)}
      />
      <textarea
        placeholder="Ingredients"
        value={newRecipe.ingredients}
        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
      />
      <textarea
        placeholder="Instructions"
        value={newRecipe.instructions}
        onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newRecipe.category}
        onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Preparation Time"
        value={newRecipe.prepTime}
        onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="Cooking Time"
        value={newRecipe.cookTime}
        onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="Servings"
        value={newRecipe.servings}
        onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newRecipe.image}
        onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
      />
      {imageLoading && <p>Loading image...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleAddRecipe}>Add Recipe</button>

      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id} className="recipe-item">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <p>Category: {recipe.category}</p>
            <p>Prep Time: {recipe.prepTime}</p>
            <p>Cooking Time: {recipe.cookTime}</p>
            <p>Servings: {recipe.servings}</p>
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
