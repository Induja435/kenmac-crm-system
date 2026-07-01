import React from 'react';

export default function FinancialsView() {
  return (
    <section className="flex-1 bg-slate-800 p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-4">KENMAC FINANCIALS</h1>
      <p className="text-slate-300 mb-6">
        This section provides an overview of financial metrics and reports for the KENMAC portal.
      </p>
      {/* Financial Summary Table */}
      <table className="w-full text-sm text-left text-slate-200 mt-4">
        <thead className="text-xs uppercase bg-slate-700">
          <tr>
            <th className="px-4 py-2">Month</th>
            <th className="px-4 py-2">Revenue</th>
            <th className="px-4 py-2">Expenses</th>
            <th className="px-4 py-2">Profit</th>
          </tr>
        </thead>
        <tbody className="bg-slate-800">
          <tr>
            <td className="px-4 py-2">January</td>
            <td className="px-4 py-2">$0.00</td>
            <td className="px-4 py-2">$0.00</td>
            <td className="px-4 py-2">$0.00</td>
          </tr>
          <tr>
            <td className="px-4 py-2">February</td>
            <td className="px-4 py-2">$0.00</td>
            <td className="px-4 py-2">$0.00</td>
            <td className="px-4 py-2">$0.00</td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-white mb-2">Revenue</h2>
          <p className="text-slate-200">$0.00</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-white mb-2">Expenses</h2>
          <p className="text-slate-200">$0.00</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-white mb-2">Profit</h2>
          <p className="text-slate-200">$0.00</p>
        </div>
      </div>
    </section>
  );
}