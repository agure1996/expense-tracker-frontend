import React, { useState, useEffect } from 'react';
import './Expense.css'; // Import your CSS file
import HomeNavbar from '../HomeNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FormGroup, Container, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Expense = () => {
  const emptyItem = {
    description: '',
    expenseDate: new Date(),
    id: 102,
    location: '',
    category: { id: 1, name: 'travel' }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState(emptyItem);

  const fetchData = async () => {
    const responseCategory = await fetch('/api/v1/category/all');
    const body = await responseCategory.json();
    setCategories(body);
    setIsLoading(false);

    const responseExpense = await fetch('/api/v1/expense/all');
    const bodyExpense = await responseExpense.json();
    setExpenses(bodyExpense);
    setIsLoading(false);
  };


  useEffect(() => {
    fetchData();
  }, []);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/v1/expense/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
  };

  const handleDropDownChange = (event) => {
    let val = event.target.value;
    const name = event.target.name;
    let newItem = { ...item };
    newItem.category.name = val;
    setItem(newItem);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    let newItem = { ...item };
    newItem[name] = value;
    handleDropDownChange(event);

    setItem(newItem);
  };

  const handleDateChange = (date) => {
    let newItem = { ...item };
    newItem.expenseDate = date;
    setItem(newItem);
  };

  const remove = async (id) => {
    await fetch(`/api/v1/expense/${id}`, {
      method: 'Delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updateExpenses = [...expenses].filter((i) => i.id !== id);
      setExpenses(updateExpenses);
    });
  };

  const title = <h3 className='expense-heading'>Log Expense</h3>;

  let optionList = categories.map((category) => (
    <option value={category.name} key={category.id} id="options">
      {category?.name}
    </option>
  ));

  let rows = expenses.map((expense) => (
    <tr key={expense.id}>
      <td>{expense?.description}</td>
      <td>{expense?.location}</td>
      <td>
        <Moment date={expense.expenseDate} format="DD/MM/YYYY" />
      </td>
      <td>{expense?.category?.name}</td>
      <td>
        <Button
          className="delete-btn"
          size="sm"
          color="danger"
          onClick={() => remove(expense?.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <HomeNavbar />
      <Container>
        {title}
        <Form className="expense-form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="category">Category</label>
            <select onChange={handleChange}>{optionList}</select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="expenseDate">Expense Date</label>
            <DatePicker selected={item.expenseDate} onChange={handleDateChange} />
          </FormGroup>

          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                onChange={handleChange}
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{' '}
            <Button color="secondary" tag={Link} to="/">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
      <Container className="expense-list">
        <h3>Expense List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="30%">Description</th>
              <th width="20%">Location</th>
              <th width="20%">Date</th>
              <th width="25%">Category</th>
              <th width="10%">Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Expense;
