import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({ formControls, formData, setFormData, buttonText, onSubmit, isBtnDisabled }) => {
  const inputBycompType = (item) => {
    let element = null;
    const value = formData[item.name] || ''
    switch (item.componentType) {
      case "input":
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange = {(e)=> setFormData({...formData, [item.name] : e.target.value})}
          />
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            id={item._id}
            value = {value}
            onChange = {(e)=> setFormData({...formData, [item.name] : e.target.value})}
          />
        )
        break;

      case "select":
        element = (
         <Select value={value} onValueChange={(value)=>setFormData({...formData,  [item.name] : value})}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={item.placeholder}/>
          </SelectTrigger>
          <SelectContent>
            {item.options && item?.options?.length > 0 ? 
              item.options.map((optionItem)=>(
                  <SelectItem key={optionItem.id} value ={optionItem.id}>{optionItem.label}</SelectItem>
              )) : null  
          }
          </SelectContent>
         </Select>
        );
        break;

      default:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            onChange = {(e)=> setFormData({...formData, [item.name] : e.target.value})}
            value={value}
          />
        );
        break;
      }
      return element
  };



  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (      
          <div className="grid w-full gap-1.5" key={controlItem?.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {inputBycompType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} className='mt-4 w-full' type='submit'>{buttonText|| "Submit"}</Button>
    </form>
  );
};

export default CommonForm;
