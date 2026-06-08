const toDateValue = (date) => Number(date.replaceAll(".", ""));

export function sortEntriesNewestFirst(entries) {
  return [...entries].sort((a, b) => toDateValue(b.date) - toDateValue(a.date));
}

export function filterEntriesByKind(entries, filter) {
  if (filter === "All") {
    return entries;
  }

  if (filter === "Images") {
    return entries.filter((entry) => entry.type === "Image");
  }

  if (filter === "Projects") {
    return entries.filter((entry) => entry.type === "Project");
  }

  return entries.filter((entry) => entry.medium === filter);
}

export function getLatestEntries(entries, count = 6) {
  return sortEntriesNewestFirst(entries).slice(0, count);
}

export function getEntryBySlug(entries, slug) {
  return entries.find((entry) => entry.slug === slug);
}

export function groupEntriesByYearMonth(entries) {
  const groups = new Map();

  for (const entry of sortEntriesNewestFirst(entries)) {
    const [year, month] = entry.date.split(".");
    const label = `${year}.${month}`;
    groups.set(label, [...(groups.get(label) ?? []), entry]);
  }

  return Array.from(groups.entries()).map(([label, groupedEntries]) => ({
    label,
    entries: groupedEntries
  }));
}
