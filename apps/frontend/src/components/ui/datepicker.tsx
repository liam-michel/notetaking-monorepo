'use client'
import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label?: string
  className?: string
}

export function DatePicker({ date, setDate, label, className }: DatePickerProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-sm font-medium leading-none">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            classNames={{
              day_range_end: 'day-range-end',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
              head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
              table: 'border-collapse space-y-1',
              nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              caption: 'pt-1 relative items-center',
              cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
