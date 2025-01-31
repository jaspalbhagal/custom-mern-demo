import React from "react";
import { render, screen } from "@testing-library/react";

import MetricsChart from "./metricsChart";

jest.mock("react-chartjs-2", () => ({
  Bar: (props: any) => {
    return <div data-testid="chart-mock">{JSON.stringify(props)}</div>;
  },
}));

describe("MetricsChart Component", () => {
  const mockMetrics = [
    { name: "User A", logins: 10, downloads: 5 },
    { name: "User B", logins: 20, downloads: 15 },
    { name: "User C", logins: 5, downloads: 2 },
  ];

  it("renders chart with correct labels and datasets", () => {
    render(<MetricsChart metrics={mockMetrics} />);

    const chart = screen.getByTestId("chart-mock");
    expect(chart).toBeInTheDocument();

    const chartProps = JSON.parse(chart.textContent || "{}");

    expect(chartProps.data.labels).toEqual(["User A", "User B", "User C"]);

    expect(chartProps.data.datasets).toHaveLength(2);
    expect(chartProps.data.datasets[0].label).toBe("Total Logins");
    expect(chartProps.data.datasets[0].data).toEqual([10, 20, 5]);
    expect(chartProps.data.datasets[1].label).toBe("Total Downloads");
    expect(chartProps.data.datasets[1].data).toEqual([5, 15, 2]);

    expect(chartProps.options.responsive).toBe(true);
    expect(chartProps.options.plugins.legend.position).toBe("top");
  });
});
