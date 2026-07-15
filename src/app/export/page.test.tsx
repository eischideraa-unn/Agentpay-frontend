import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastProvider } from "@/components/ToastProvider";
import { ExportActions } from "./ExportActions";

const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;
let clickSpy: jest.SpyInstance;

function renderExportActions() {
  return render(
    <ToastProvider>
      <ExportActions apiBase="https://api.example.test" />
    </ToastProvider>,
  );
}

function mockSuccessResponse(filename = "usage.json", content = "{}") {
  return {
    ok: true,
    status: 200,
    blob: async () => new Blob([content], { type: "application/json" }),
    headers: {
      get: (name: string) =>
        name.toLowerCase() === "content-disposition"
          ? `attachment; filename="${filename}"`
          : null,
    },
  } as Response;
}

beforeEach(() => {
  globalThis.fetch = jest.fn();
  clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation();
  URL.createObjectURL = jest.fn(() => "blob:usage-export");
  URL.revokeObjectURL = jest.fn();
});

afterEach(() => {
  clickSpy.mockRestore();
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
});

describe("ExportActions", () => {
  it("downloads the selected export, uses the response filename, and shows a toast", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce(
      mockSuccessResponse("usage.csv"),
    );

    renderExportActions();

    fireEvent.click(screen.getByRole("button", { name: "Download CSV" }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://api.example.test/api/v1/usage/export.csv",
      );
      expect(clickSpy).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:usage-export");
    });
    expect(await screen.findByText("CSV export downloaded.")).toBeInTheDocument();
  });

  it("disables both download buttons while a request is pending", async () => {
    let resolveResponse: (response: Response) => void = () => {};
    (globalThis.fetch as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => {
        resolveResponse = resolve;
      }),
    );

    renderExportActions();

    fireEvent.click(screen.getByRole("button", { name: "Download JSON" }));

    expect(screen.getByRole("button", { name: /downloading json/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Download CSV" })).toBeDisabled();
    expect(screen.getByText("Preparing JSON export...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Preparing JSON export");

    resolveResponse(mockSuccessResponse());

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Download JSON" })).toBeEnabled();
    });
  });

  it("shows backend errors to the operator", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 503,
      text: async () => "export service unavailable",
    } as Response);

    renderExportActions();

    fireEvent.click(screen.getByRole("button", { name: "Download JSON" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "export service unavailable",
    );
  });

  it("still downloads an empty export response", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce(
      mockSuccessResponse("usage-empty.json", ""),
    );

    renderExportActions();

    fireEvent.click(screen.getByRole("button", { name: "Download JSON" }));

    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
