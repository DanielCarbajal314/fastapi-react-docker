import { Page, selectors } from "@playwright/test";
import { TEST_URL } from "../../config";

export class BasePage {
  constructor(protected readonly page: Page) {
    this.page = page;
  }

  protected async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${TEST_URL}/${path}`);
  }

  public async waitForLoading(): Promise<void> {
    await this.page.getByTestId("is_loading");
  }
}