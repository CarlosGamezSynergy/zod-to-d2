import { isEnumProperty, type PropertyType } from "../types/Property.type.js";

export function buildColumn(property: PropertyType) {
  const propNameChain = property.name.split(".");
  const propName =
    propNameChain.slice(1, propNameChain.length).join(".") || property.name;

  let prop = `"${propName}${property.isOptional ? "?" : ""}": `;

  if (isEnumProperty(property)) {
    prop += `ENUM(${Object.values(property.values)
      .map((value) => `'${value}'`)
      .join(", ")})`;
  } else {
    prop += `${property.type} ${property.isNullable ? "| null" : ""}`;
  }

  if (property.isPrimaryKey || property.isForeignKey) {
    let constraints = "{constraint: [ ";

    if (property.isPrimaryKey) {
      constraints += "primary_key ";
    }

    if (property.isForeignKey) {
      constraints += "foreign_key ";
    }

    prop += constraints + "]} ";
  }

  if (property.notes && property.notes.length > 0) {
    prop += `# ${property.notes.join(" ")}`;
  }

  return prop;
}
