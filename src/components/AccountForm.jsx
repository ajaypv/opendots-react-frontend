import { FormWrapper } from "./FormWrapper";

export function AccountForm({ langauage1, langauage2, updateFields }) {
  return (
    <FormWrapper title="Languages you know">
    <label>First language</label>
    <select
      required
      value={langauage1}
      onChange={(e) => updateFields({ langauage1: e.target.value })}
    >
      <option value="">-- Select langauage 1 --</option>
      <option value="English">English</option>
      <option value="Kannada">Kannada</option>
      <option value="Hindi">Hindi</option>
      <option value="Tamil">Tamil</option>
      <option value="Telugu">Telugu</option>
      <option value="Bengali">Bengali</option>
      <option value="Marathi">Marathi</option>
      <option value="Gujarati">Gujarati</option>
      <option value="Punjabi">Punjabi</option>
      <option value="Malayalam">Malayalam</option>
    </select>
    <label>Second language</label>
    <select
      required
      value={langauage2}
      onChange={(e) => updateFields({ langauage2: e.target.value })}
    >
        <option value="">-- Select langauage 2 --</option>
      <option value="English">English</option>
      <option value="Kannada">Kannada</option>
      <option value="Hindi">Hindi</option>
      <option value="Tamil">Tamil</option>
      <option value="Telugu">Telugu</option>
      <option value="Bengali">Bengali</option>
      <option value="Marathi">Marathi</option>
      <option value="Gujarati">Gujarati</option>
      <option value="Punjabi">Punjabi</option>
      <option value="Malayalam">Malayalam</option>
    </select>
  </FormWrapper>
  
  );
}
