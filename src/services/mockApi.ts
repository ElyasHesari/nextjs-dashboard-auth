import { User, DashboardCard, LoginResponse } from "@/types";
import { getTranslation } from "@/i18n/useTranslation";

class MockAPIService {
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    await this.delay(1500);

    // simulate network error (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Network Error");
    }

    // simulate server error (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Server Error 500");
    }

    // users test data
    const users = [
      { username: "admin", password: "admin123", role: "admin" as const },
      { username: "owner", password: "owner123", role: "owner" as const },
    ];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return {
        success: true,
        data: {
          username: user.username,
          role: user.role,
          token: `mock_token_${Date.now()}`,
        },
      };
    }

    return {
      success: false,
      error: getTranslation('login.invalidCredentials'),
    };
  }

  async getDashboardData(
    role: "admin" | "owner",
    simulateError: boolean = false
  ): Promise<DashboardCard[]> {
    await this.delay(1200);

    if (simulateError) {
      throw new Error(getTranslation('dashboard.loadingError'));
    }

    const count = role === "admin" ? 5 : 10;
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      value: Math.floor(Math.random() * 1000) + 100,
      title: `${getTranslation('common.card')} ${i + 1}`,
    }));
  }
}

export const apiService = new MockAPIService();
