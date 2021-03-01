import React, { useState, useEffect } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Accordion,
  Card,
  Form,
} from "react-bootstrap";
import moment from "moment";

const App = () => {
  const [formMeal, setFormMeal] = useState({
    name: "",
    ingredients: [
      {
        name: "",
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      },
    ],
  });
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Control the saving of meal details to user account.
  useEffect(() => {
    console.log("change");
  }, [meals]);

  // Start editing a new meal.
  function createNewMeal() {
    setShowForm(true);
    setFormMeal({
      name: "",
      ingredients: [
        {
          name: "",
          calories: 0,
          protein: 0,
          fat: 0,
          carbs: 0,
        },
      ],
      key: undefined,
    });
  }

  // Add a new ingredient to the meal being edited.
  function addIngredient() {
    setFormMeal((prevState) => {
      prevState.ingredients.push({
        name: "",
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      });

      return {
        ...prevState,
      };
    });
  }

  // Save the meal being edited as a new meal.
  function saveMeal() {
    setShowForm(false);
    if (formMeal.key === undefined) {
      setMeals((prevState) => {
        prevState.push({
          ...formMeal,
        });
        return [...prevState];
      });
    } else {
      setMeals((prevState) => {
        prevState[formMeal.key] = { ...formMeal };
        return [...prevState];
      });
    }
  }

  // Get the total of a particular property in a meal.
  // E.g. add all calories for all ingredients.
  function getIngredientTotal(meal, key) {
    return meal.ingredients.reduce((a, b) => {
      let valueOne = a;
      let valueTwo = b;
      if (typeof a === "object") valueOne = parseInt(a[key]);
      if (typeof b === "object") valueTwo = parseInt(b[key]);
      return valueOne + valueTwo;
    }, 0);
  }

  // Get the total of all meals of a particular property.
  function getMealTotal(key) {
    return meals.reduce((a, b) => {
      let valueOne = a;
      let valueTwo = b;
      if (typeof a === "object") valueOne = getIngredientTotal(a, key);
      if (typeof b === "object") valueTwo = getIngredientTotal(b, key);
      return valueOne + valueTwo;
    }, 0);
  }

  // Delete a meal entry.
  function deleteMeal(key) {
    setMeals((prevState) => {
      prevState.splice(key, 1);
      return [...prevState];
    });
  }

  // Edit a meal entry.
  function editMeal(key) {
    setShowForm(true);
    setFormMeal(() => {
      return {
        ...meals[key],
        key: key,
      };
    });
  }

  // Handle the form values changing.
  function handleChange(event, key, field) {
    const data = event.target.value;
    if (key !== undefined) {
      setFormMeal((prevState) => {
        prevState.ingredients[key][field] = data;
        return {
          ...prevState,
        };
      });
    } else {
      setFormMeal((prevState) => {
        prevState.name = data;
        return {
          ...prevState,
        };
      });
    }
    event.preventDefault();
  }

  return (
    <>
      <Container fluid>
        <Row className="controls-container m-auto">
          <Col xs="4">
            <Button variant="light">Prev</Button>
          </Col>
          <Col xs="4">
            <p className="default-text">{moment().format("LL")}</p>
          </Col>
          <Col xs="4">
            <Button variant="light">Next</Button>
          </Col>
        </Row>
        <Row className="meal-container">
          <Accordion style={{ width: "100%" }}>
            {meals.map((meal, key) => (
              <Card key={key}>
                <Accordion.Toggle as={Card.Header} eventKey={key + 1}>
                  {meal.name} -{" "}
                  <span>
                    <b>{getIngredientTotal(meal, "calories")}</b>
                  </span>
                  {" - "}
                  <span className="protein-text">
                    <b>{getIngredientTotal(meal, "protein")}</b>
                  </span>
                  {"/"}
                  <span className="fat-text">
                    <b>{getIngredientTotal(meal, "fat")}</b>
                  </span>
                  {"/"}
                  <span className="carbs-text">
                    <b>{getIngredientTotal(meal, "carbs")}</b>
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={key + 1}>
                  <Card.Body>
                    <ul>
                      {meal.ingredients.map((ing, ingKey) => (
                        <li key={ingKey}>
                          {ing.name} - {ing.calories} -
                          <span className="protein-text">{ing.protein}</span>/
                          <span className="fat-text">{ing.fat}</span>/
                          <span className="carbs-text">{ing.carbs}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonGroup aria-label="meal-controls" className="m-3">
                      <Button variant="danger" onClick={() => deleteMeal(key)}>
                        Delete
                      </Button>
                      <Button variant="warning" onClick={() => editMeal(key)}>
                        Edit
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Row>
        <Row className="add-meal-container">
          <Col>
            <Button variant="light" onClick={() => createNewMeal()}>
              Add Meal
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="default-text">
              <b>{getMealTotal("calories")}</b>
            </h1>
          </Col>
        </Row>
        <Row className="macro-container m-auto">
          <Col>
            <p className="protein-text macro-text">
              <b>{getMealTotal("protein")}</b>
            </p>
          </Col>
          <Col>
            <p className="fat-text macro-text">
              <b>{getMealTotal("fat")}</b>
            </p>
          </Col>
          <Col>
            <p className="carbs-text macro-text">
              <b>{getMealTotal("carbs")}</b>
            </p>
          </Col>
        </Row>
      </Container>

      {showForm ? (
        <Container className="detail-container">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="mealName">
                <Form.Label>Meal Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Meal name"
                  value={formMeal.name}
                  onChange={(event) => handleChange(event)}
                />
              </Form.Group>
            </Form.Row>
            <br />
            {formMeal.ingredients.map((ingredient, key) => (
              <div key={key}>
                <Form.Row>
                  <Form.Group as={Col} controlId="ingredientName">
                    <Form.Label>Ingredient Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(event) => handleChange(event, key, "name")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="calories">
                    <Form.Label>Calories</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Calories"
                      value={ingredient.calories}
                      onChange={(event) => handleChange(event, key, "calories")}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="protein">
                    <Form.Label className="protein-text">Protein</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Protein"
                      value={ingredient.protein}
                      onChange={(event) => handleChange(event, key, "protein")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="fat">
                    <Form.Label className="fat-text">Fat</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Fat"
                      value={ingredient.fat}
                      onChange={(event) => handleChange(event, key, "fat")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="carbs">
                    <Form.Label className="carbs-text">Carbs</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Carbs"
                      value={ingredient.carbs}
                      onChange={(event) => handleChange(event, key, "carbs")}
                    />
                  </Form.Group>
                </Form.Row>
              </div>
            ))}

            <ButtonGroup aria-label="detail-controls" className="m-3">
              <Button variant="danger" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="warning" onClick={() => addIngredient()}>
                Add Ingredient
              </Button>
              <Button variant="primary" onClick={() => saveMeal()}>
                Save
              </Button>
            </ButtonGroup>
          </Form>
        </Container>
      ) : null}
    </>
  );
};

export default withAuthenticator(App);
