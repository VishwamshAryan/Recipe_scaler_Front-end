import React, { useState } from 'react';
import './RecipeScaler.css';

function RecipeScaler() {
  const [originalServings, setOriginalServings] = useState(1);
  const [desiredServings, setDesiredServings] = useState(1);
  const [measurementSystem, setMeasurementSystem] = useState('metric'); // Default to metric
  const [ingredients, setIngredients] = useState([]);
  const [scaledIngredients, setScaledIngredients] = useState([]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {
      name: '',
      quantity: '',
      unit: 'g', // Default unit for metric
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleScale = (e) => {
    e.preventDefault();
    const scaled = ingredients.map((ingredient) => {
      let quantity = (parseFloat(ingredient.quantity) * (desiredServings / originalServings)).toFixed(2);

      // Convert measurement if necessary
      if (measurementSystem === 'imperial' && ingredient.unit === 'g') {
        // Convert grams to pounds
        quantity = (quantity / 453.592).toFixed(2);
        ingredient.unit = 'lbs';
      } else if (measurementSystem === 'metric' && ingredient.unit === 'lbs') {
        // Convert pounds to grams
        quantity = (quantity * 453.592).toFixed(2);
        ingredient.unit = 'g';
      }

      return {
        ...ingredient,
        quantity,
      };
    });
    setScaledIngredients(scaled);
  };

  return (
    <div className="recipe-scaler">
      <h2>Scale Your Recipe</h2>
      <form onSubmit={handleScale}>
        <div className="servings-inputs">
          <div>
            <label>Original Servings:</label>
            <input
              type="number"
              value={originalServings}
              onChange={(e) => setOriginalServings(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <label>Desired Servings:</label>
            <input
              type="number"
              value={desiredServings}
              onChange={(e) => setDesiredServings(e.target.value)}
              min="1"
            />
          </div>
        </div>
        <div className="measurement-system">
          <label>Select Measurement System:</label>
          <select value={measurementSystem} onChange={(e) => setMeasurementSystem(e.target.value)}>
            <option value="metric">Metric (g, kg)</option>
            <option value="imperial">Imperial (lbs, oz)</option>
          </select>
        </div>
        <h3>Ingredients:</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input">
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="ingredient-name"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              min="0"
              className="ingredient-quantity"
            />
            <select
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            >
              {measurementSystem === 'metric' ? (
                <>
                  <option value="g">grams</option>
                  <option value="kg">kilograms</option>
                  <option value="cups">cups</option>
                </>
              ) : (
                <>
                  <option value="lbs">pounds</option>
                  <option value="oz">ounces</option>
                  <option value="cups">cups</option>
                </>
              )}
            </select>
          </div>
        ))}
        <button onClick={handleAddIngredient} className="add-ingredient-button">Add Ingredient</button>
        <button type="submit" className="scale-recipe-button">Scale Recipe</button>
      </form>
      <div className="scaled-ingredients">
        <h3>Scaled Ingredients:</h3>
        <ul>
          {scaledIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}: {ingredient.quantity} {ingredient.unit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeScaler;
