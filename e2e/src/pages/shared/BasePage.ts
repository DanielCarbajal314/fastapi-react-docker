import { Page } from "@playwright/test";
import { TEST_URL, IS_CONTAINER } from "../../config";

export class BasePage {
  constructor(protected readonly page: Page) {
    this.page = page;
  }

  public async setupProxy(): Promise<void> {
    if (IS_CONTAINER) {
      await this.page.route('**/*', (route) => {
        const request = route.request();
        const url = new URL(request.url());
        if (url.hostname === 'localhost') {
          url.hostname = 'server';
        }
        route.continue({ url: url.toString() });
      });
    };
  }

  protected async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${TEST_URL}/${path}`);
  }

  public async waitForLoading(): Promise<void> {
    await this.page.getByTestId("is_loading");
  }
}