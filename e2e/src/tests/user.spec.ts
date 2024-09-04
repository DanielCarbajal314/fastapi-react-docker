import { test, expect, type Page } from '@playwright/test';
import { UserPage } from '../pages';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  const userPage = new UserPage(page);
  await userPage.navigateToPage();
  await userPage.setupProxy();
});

test('can register user', async ({ page }) => {
  const userPage = new UserPage(page);
  const personFullname = faker.person.fullName();
  await userPage.fillNewUserNameInput(personFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(personFullname);
});

test('can filter user', async ({ page }) => {
  const userPage = new UserPage(page);
  const personFullname = faker.person.fullName();
  const secondPersonFullname = faker.person.fullName();
  const thirdPersonFullname = faker.person.fullName();
  await userPage.fillNewUserNameInput(personFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(personFullname);
  await userPage.fillNewUserNameInput(secondPersonFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(secondPersonFullname);
  await userPage.fillNewUserNameInput(thirdPersonFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(thirdPersonFullname);
  await userPage.fillUserNameFilterInput(personFullname);
  await userPage.clickSearch();
  await userPage.waitForLoading();
  await userPage.userExistOnTable(personFullname);
  expect(await userPage.countTableRows()).toBe(1);
});

test('can delete user', async ({ page }) => {
  const userPage = new UserPage(page);
  const personFullname = faker.person.fullName();
  const secondPersonFullname = faker.person.fullName();
  await userPage.fillNewUserNameInput(personFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(personFullname);
  await userPage.clickDeleteForUser(personFullname);
  await userPage.fillNewUserNameInput(secondPersonFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(secondPersonFullname);
  await userPage.fillUserNameFilterInput(personFullname);
  await userPage.clickSearch();
  await userPage.waitForLoading();
});

test('can enable update', async ({ page }) => {
  const userPage = new UserPage(page);
  const personFullname = faker.person.fullName();
  await userPage.fillNewUserNameInput(personFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(personFullname);
  await userPage.clickUpdateForUser(personFullname);
  await userPage.isOnEditMode(personFullname);
});

test('can disable update', async ({ page }) => {
  const userPage = new UserPage(page);
  const personFullname = faker.person.fullName();
  await userPage.fillNewUserNameInput(personFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(personFullname);
  await userPage.clickUpdateForUser(personFullname);
  await userPage.isOnEditMode(personFullname);
  await userPage.clickUpdateCancelForUser(personFullname);
  await userPage.isNotOnEditMode(personFullname);
});

test('can update user', async ({ page }) => {
  const userPage = new UserPage(page);
  const personFullname = faker.person.fullName();
  const personFullnameUpdated = personFullname + ' updated';
  await userPage.fillNewUserNameInput(personFullname);
  await userPage.clickRegister();
  await userPage.userExistOnTable(personFullname);
  await userPage.clickUpdateForUser(personFullname);
  await userPage.isOnEditMode(personFullname);
  await userPage.fillUserNameToUpdate(personFullname, personFullnameUpdated);
  await userPage.clickUpdateConfirmForUser(personFullname);
  await userPage.userExistOnTable(personFullnameUpdated);
});