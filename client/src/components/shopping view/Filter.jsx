import { filterOptions } from "@/config"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

const Filter = ({Filters, handleFilter}) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map((Item)=>(
                <>
                <div>
                <h3 className="text-base font-bold">{Item}</h3>
                <div className="grid gap-2 mt-2">
                    {
                        filterOptions[Item].map((option)=>(
                            <Label className="flex font-medium items-center gap-2 ">
                                <Checkbox
                                checked={Filters && Object.keys(Filters).length > 0 && Filters[Item] && Filters[Item].indexOf(option.id) > -1 }
                                onCheckedChange={()=>handleFilter(Item,option.id)}/>
                                {option.label}
                            </Label>
                        ))
                    }
                </div>
                </div>
                <Separator/>
                </>
            ))}
        </div>
    </div>
  )
}

export default Filter