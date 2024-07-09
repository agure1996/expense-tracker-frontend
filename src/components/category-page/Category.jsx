import React, { useState, useEffect } from "react";
import HomeNavbar from "../HomeNavbar";
import { Form, FormGroup, Container, Button, Table, Input } from "reactstrap";
import "./Category.css";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/v1/category/all");
      const body = await response.json();
      setCategories(body);
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const category = { name: newCategory };

    await fetch(`/api/v1/category/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    setCategories([...categories, category]);
    setNewCategory("");
  };

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  const remove = async (id) => {
    await fetch(`/api/v1/category/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
  };

  const title = <h3 className="category-heading">Add new Category</h3>;

  let rows = categories.map((category) => (
    <tr key={category.id}>
      <td>{category.name}</td>
      <td>
        <Button size="sm" color="danger" onClick={() => remove(category.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  if (isLoading) return <div><h1>Loading Categories...</h1></div>;

  return (
    <>
      <HomeNavbar />
      <div className="App">
        <Container>
          {title}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="description"
                id="description"
                value={newCategory}
                onChange={handleChange}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
      <Container>
        <Table className="mt-4 category-table">
          <thead>
            <tr>
              <th width="100%">Category</th>
              <th width="10%">Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </>
  );
};

export default Category;
