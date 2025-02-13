import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Visitor } from "@shared/schema";

interface VisitorTableProps {
  visitors: Visitor[];
}

export default function VisitorTable({ visitors }: VisitorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-purple-500/20">
          <TableHead className="text-purple-400">Visitor ID</TableHead>
          <TableHead className="text-purple-400">Browser</TableHead>
          <TableHead className="text-purple-400">OS</TableHead>
          <TableHead className="text-purple-400">IP Address</TableHead>
          <TableHead className="text-purple-400">Last Seen</TableHead>
          <TableHead className="text-purple-400">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visitors.map((visitor) => (
          <TableRow 
            key={visitor.visitorId}
            className="border-purple-500/10 hover:bg-purple-500/5 transition-colors"
          >
            <TableCell className="font-mono text-cyan-400">{visitor.visitorId}</TableCell>
            <TableCell>{visitor.browserName}</TableCell>
            <TableCell>{visitor.os}</TableCell>
            <TableCell className="font-mono">{visitor.ipAddress}</TableCell>
            <TableCell>
              {visitor.lastSeen ? new Date(visitor.lastSeen).toLocaleString() : 'N/A'}
            </TableCell>
            <TableCell>
              {visitor.isFlagged ? (
                <Badge 
                  variant="destructive" 
                  className="bg-red-500/20 text-red-400 border-red-500/50 animate-pulse"
                >
                  Flagged
                </Badge>
              ) : (
                <Badge 
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                >
                  Normal
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}