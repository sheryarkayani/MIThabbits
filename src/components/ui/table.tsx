// src/components/ui/table.tsx
import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-700">{children}</table>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <thead className="bg-gray-800">{children}</thead>;
};

export const TableBody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <tbody className="bg-gray-800 divide-y divide-gray-700">{children}</tbody>
  );
};

export const TableRow: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className = '',
}) => {
  return <tr className={className}>{children}</tr>;
};

export const TableHead: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className = '',
}) => {
  return (
    <th
      className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

export const TableCell: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className = '',
}) => {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
};
