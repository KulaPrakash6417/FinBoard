export const exportJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
};

export const exportCSV = (data) => {
    const headers = ["Title", "Amount", "Type", "Category", "Date"];

    const rows = data.map((t) =>
        [t.title, t.amount, t.type, t.category, t.date].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
};