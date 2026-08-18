"""Reference file for eyeballing a theme."""
from __future__ import annotations

import re
from dataclasses import dataclass, field
from enum import Enum

MAX_BREATHS: int = 12
SLUG = re.compile(r"^[a-z][a-z0-9_-]*$")


class Breathing(Enum):
    WATER = "water"
    THUNDER = "thunder"
    FLAME = "flame"


@dataclass(frozen=True)
class Slayer:
    name: str
    breathing: Breathing = Breathing.WATER
    scars: list[str] = field(default_factory=list)

    @property
    def slug(self) -> str:
        return self.name.lower().replace(" ", "-")

    def train(self, *, hours: float = 8.0) -> str:
        if hours <= 0:
            raise ValueError(f"invalid hours: {hours!r}")
        return f"{self.name} trained {hours:.1f}h of {self.breathing.value}"


if __name__ == "__main__":
    corps = [Slayer("Tanjiro"), Slayer("Zenitsu", Breathing.THUNDER)]
    print("\n".join(s.train(hours=6) for s in corps if SLUG.match(s.slug)))
