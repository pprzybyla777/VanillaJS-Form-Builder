# VanillaJS Form Builder
This is technical task I've done during the recruitment process.

## Goal
The goal of this project is to build a simple form builder that will generate a form for users to fill out.

## Specification

[Form Builder](./formbuilder.png)

The form builder will have 3 types of form inputs. Each of these can also have sub-inputs which will only show when the parent input is answered a certain way. 

The types of conditions are as follows
* Text
    * Equals - Text entered is equal to this value
* Number
    * Equals - Number entered is equal to this value
    * Greater than - Number entered is greater than this value
    * Less than - Number entered is less than this value
* Yes / No (radio)
    * Equals - Radio selected is equal to this value (either yes or no)

The user should be able to keep creating sub-inputs with conditions to as many levels deep as they would like. Each sub-input’s condition will correspond to the value of the parent input. By default, the create tab should start out blank with just the Add Input button there for the user to create their first input.

## How to build
After dowlanding this repo run `npm install` in the project directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.
The page will reload when you make changes.\

## Important note

This project uses local storage to persist state.
