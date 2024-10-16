"use client"

import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/stores"
import { fetchCustomerDataAPI } from "@/stores/slices/customerSlice"
import { Customer } from "@/types/dataCustomers"

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "customerID",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Customer ID
                <CaretSortIcon className="h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const customerID: number = row.getValue("customerID")
            return <div className="ml-10">{customerID}</div>
        },
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "age",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Age
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const age: number = row.getValue("age")
            return <div className="ml-10">{age}</div>
        },
    },
    {
        accessorKey: "annual_income",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Annual Income
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const annual_income: number = row.getValue("annual_income")
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(annual_income)
            return <div className="ml-10">{formatted}</div>
        },
    },
    {
        accessorKey: "spending_score",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Spending Score
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const spending_score: number = row.getValue("spending_score")
            return <div className="ml-10">{spending_score}</div>
        },
    },
    {
        accessorKey: "profession",
        header: "Profession",

    },
    {
        accessorKey: "work_experience",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Work Experience
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const work_experience: number = row.getValue("work_experience")
            return <div className="ml-10">{work_experience}</div>
        },
    },
    {
        accessorKey: "family_size",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Family Size
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const family_size: number = row.getValue("family_size")
            return <div className="ml-10">{family_size}</div>
        },
    },
]

export function TableCustomers() {
    const dispatch = useDispatch<AppDispatch>()
    const { customerData, customerLoading } = useSelector(
        (state: RootState) => state.customerSlice
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [metaData, setMetaData] = React.useState({
        page: 1,
        limit: 5,
        search: "",
    })
    const [searchTerm, setSearchTerm] = React.useState("")
    const [totalPage, SetTotalPage] = React.useState(0)

    const debouncedSearch = React.useMemo(
        () =>
            debounce((value: string) => {
                setMetaData((prev) => ({ ...prev, search: value, page: 1 }))
            }, 500),
        []
    )

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        debouncedSearch(value)
    }

    const table = useReactTable({
        data: customerData?.data || [],
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    React.useEffect(() => {
        const fetchCustomerData = async () => {
            await dispatch(
                fetchCustomerDataAPI(metaData.page, metaData.limit, metaData.search)
            )
        }
        fetchCustomerData()
    }, [metaData.page, metaData.search])

    React.useEffect(() => {
        if (customerData?.totalPages) {
            SetTotalPage(customerData?.totalPages)
        }
    }, [customerData])

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search profession..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {customerLoading ? " Loading..." : "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMetaData((prev) => ({ ...prev, page: prev.page - 1 }))}
                    disabled={metaData.page === 1}
                >
                    Previous
                </Button>
                <div>
                    {!customerLoading && (
                        <>
                            {metaData.page} of {totalPage}
                        </>
                    )}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMetaData((prev) => ({ ...prev, page: prev.page + 1 }))}
                    disabled={metaData.page >= totalPage}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
