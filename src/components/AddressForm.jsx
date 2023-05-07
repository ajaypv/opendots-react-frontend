import { FormWrapper } from "./FormWrapper";

export function AddressForm({collegeName, branchName, semester, section, updateFields }) {
  return (
    <FormWrapper title="College information">
      <label>College Name</label>
      <select
  autoFocus
  required
  value={collegeName}
  onChange={(e) => updateFields({ collegeName: e.target.value })}
>
<option value="">-- Select college --</option>
  <option value="New Horizon College of Engineering">New Horizon College of Engineering</option>
  <option value="Indian Institute of Science (IISc) Bangalore">Indian Institute of Science (IISc) Bangalore</option>
  <option value="International Institute of Information Technology (IIIT) Bangalore">International Institute of Information Technology (IIIT) Bangalore</option>
  <option value="R.V. College of Engineering">R.V. College of Engineering</option>
  <option value="BMS College of Engineering">BMS College of Engineering</option>
  <option value="PES University">PES University</option>
  <option value="M.S. Ramaiah Institute of Technology">M.S. Ramaiah Institute of Technology</option>
  <option value="Bangalore Institute of Technology">Bangalore Institute of Technology</option>
  <option value="Dayananda Sagar College of Engineering">Dayananda Sagar College of Engineering</option>
  <option value="Sir M Visvesvaraya Institute of Technology">Sir M Visvesvaraya Institute of Technology</option>
  <option value="Nitte Meenakshi Institute of Technology">Nitte Meenakshi Institute of Technology</option>
</select>


      <label>BranchName</label>
      <select
  required
  value={branchName}
  onChange={(e) => updateFields({ branchName: e.target.value })}
>
  <option value="">-- Select Branch --</option>
  <option value="Computer Science and Engineering">Computer Science and Engineering</option>
  <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
  <option value="Mechanical Engineering">Mechanical Engineering</option>
  <option value="Civil Engineering">Civil Engineering</option>
  <option value="Chemical Engineering">Chemical Engineering</option>
  <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
  <option value="Aeronautical Engineering">Aeronautical Engineering</option>
  <option value="Information Science and Engineering">Information Science and Engineering</option>
  <option value="Environmental Engineering">Environmental Engineering</option>
  <option value="Biotechnology Engineering">Biotechnology Engineering</option>
</select>

      <label>Semester</label>
      <select
  required
  value={semester}
  onChange={(e) => updateFields({ semester: e.target.value })}
>
  <option value="">-- Select Semester --</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
</select>

      <label>Section</label>
      <select
  required
  value={section}
  onChange={(e) => updateFields({ section: e.target.value })}
>
  <option value="">-- Select Section --</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
  <option value="D">D</option>
  <option value="E">E</option>
  <option value="F">F</option>
  <option value="G">G</option>
  <option value="H">H</option>
  <option value="I">I</option>
  <option value="J">J</option>
</select>

    </FormWrapper>
  );
}
