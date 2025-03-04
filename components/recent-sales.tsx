import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Amazon Marketplace</p>
          <p className="text-sm text-muted-foreground">Coffee Table #A1234</p>
        </div>
        <div className="ml-auto font-medium">+$249.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Amazon Marketplace</p>
          <p className="text-sm text-muted-foreground">
            Dining Chair Set #B5678
          </p>
        </div>
        <div className="ml-auto font-medium">+$399.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Amazon Marketplace</p>
          <p className="text-sm text-muted-foreground">Bookshelf #C9012</p>
        </div>
        <div className="ml-auto font-medium">+$149.00</div>
      </div>
    </div>
  )
}
