import { BasePage } from "./shared/BasePage";

export class UserPage extends BasePage {

    async navigateToPage(): Promise<void> {
        await this.navigateTo('users');
    }

    async fillNewUserNameInput(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
        const newUserInput = await this.page.getByTestId("new_user_input");
        await newUserInput.fill(name);
    }

    async fillUserNameFilterInput(name: string): Promise<void> {
        const newUserInput = await this.page.getByTestId("user_seach_input");
        await newUserInput.fill(name);
    }

    async clickRegister(): Promise<void> {
        const button = await this.page.getByTestId("new_user_button");
        await button.click();
    }

    async clickSearch(): Promise<void> {
        const button = await this.page.getByTestId("user_search_button");
        await button.click();
    }

    async countTableRows(): Promise<number> {
        const table = await this.page.getByTestId("user_table");
        await table.textContent();
        return await table.locator("tr").count();
    }

    async clickClear(): Promise<void> {
        const button = await this.page.getByTestId("user_search_clear_button");
        await button.click();
    }

    async userExistOnTable(username: string): Promise<void> {
        await this.page.getByTestId(username);
    }

    async isOnEditMode(username: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        await userRow.getByTestId("is_on_update_mode")
    }

    async isNotOnEditMode(username: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        await userRow.getByTestId("is_on_update_is_not_in_update_modemode")
    }

    async clickDeleteForUser(username: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        const deleteButton = await userRow.getByTestId("delete_button");
        await deleteButton.click();
    }

    async clickUpdateForUser(username: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        const updateButton = await userRow.getByTestId("update_button");
        await updateButton.click();
    }

    async clickUpdateConfirmForUser(username: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        const deleteButton = await userRow.getByTestId("update_confirm");
        await deleteButton.click();
    }

    async clickUpdateCancelForUser(username: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        const updateButton = await userRow.getByTestId("update_cancel");
        await updateButton.click();
    }

    async fillUserNameToUpdate(username: string, newUsername: string): Promise<void> {
        const userRow = await this.page.getByTestId(username);
        const updateButton = await  userRow.getByTestId("update_user_name_text_input");
        await updateButton.fill(newUsername);
    }

    
}