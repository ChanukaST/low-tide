import type { ReactNode } from "react";

import type { GarmentArtKind } from "@/types/catalog";
import { cn } from "@/lib/utils";

type ProductArtProps = {
  artKind: GarmentArtKind;
  background: string;
  foreground: string;
  name: string;
  className?: string;
  minimal?: boolean;
  decorative?: boolean;
};

const ACCENT = "#ff4b1f";
const PAPER = "#f3efe5";
const INK = "#111110";

function isDark(hex: string) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function Frame({
  background,
  foreground,
  children,
  label,
  showChrome = true,
  decorative = false,
}: {
  background: string;
  foreground: string;
  children: ReactNode;
  label: string;
  showChrome?: boolean;
  decorative?: boolean;
}) {
  const meta = isDark(background) ? PAPER : INK;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: background }}
    >
      <svg
        viewBox="0 0 480 600"
        className="h-full w-full"
        role={decorative ? undefined : "img"}
        aria-hidden={decorative ? "true" : undefined}
        aria-label={
          decorative
            ? undefined
            : `${label}. Original demo garment illustration.`
        }
      >
        <defs>
          <linearGradient
            id={`art-light-${artId(background, foreground)}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>
          <pattern
            id={`art-grid-${artId(background, foreground)}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke={meta}
              strokeWidth="0.6"
              opacity="0.13"
            />
          </pattern>
          <pattern
            id={`art-dots-${artId(background, foreground)}`}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.7" fill={meta} opacity="0.14" />
          </pattern>
        </defs>

        <rect width="480" height="600" fill={background} />
        <rect
          width="480"
          height="600"
          fill={`url(#art-grid-${artId(background, foreground)})`}
        />
        <circle
          cx="410"
          cy="112"
          r="118"
          fill="none"
          stroke={meta}
          strokeWidth="0.75"
          opacity="0.22"
        />
        <path
          d="M-20 452C60 405 106 487 177 458C258 424 278 500 367 466C417 447 456 456 500 430"
          fill="none"
          stroke={meta}
          strokeWidth="0.8"
          opacity="0.24"
        />
        <path
          d="M0 560H480"
          fill="none"
          stroke={meta}
          strokeWidth="0.75"
          opacity="0.22"
        />
        <path
          d="M26 72V534M446 72V534"
          fill="none"
          stroke={meta}
          strokeWidth="0.6"
          opacity="0.14"
        />
        {Array.from({ length: 9 }).map((_, index) => (
          <path
            key={index}
            d={`M22 ${92 + index * 52}H29`}
            stroke={meta}
            strokeWidth="0.8"
            opacity="0.28"
          />
        ))}
        {showChrome ? (
          <>
            <text
              x="26"
              y="50"
              fill={meta}
              opacity="0.55"
              fontFamily="var(--font-archivo), sans-serif"
              fontSize="7"
              fontWeight="600"
              letterSpacing="1.8"
            >
              LOW TIDE / SS26
            </text>
            <text
              x="454"
              y="50"
              fill={meta}
              opacity="0.55"
              textAnchor="end"
              fontFamily="var(--font-archivo), sans-serif"
              fontSize="7"
              fontWeight="600"
              letterSpacing="1.8"
            >
              SAMPLE
            </text>
          </>
        ) : null}
        <g>{children}</g>
        <rect
          width="480"
          height="600"
          fill={`url(#art-dots-${artId(background, foreground)})`}
        />
        {showChrome ? (
          <>
            <rect x="26" y="558" width="22" height="2" fill={ACCENT} />
            <text
              x="454"
              y="563"
              fill={meta}
              opacity="0.48"
              textAnchor="end"
              fontFamily="var(--font-archivo), sans-serif"
              fontSize="6.5"
              fontWeight="500"
              letterSpacing="1.5"
            >
              DEMO / NOT FOR SALE
            </text>
          </>
        ) : null}
      </svg>
      <div
        aria-hidden="true"
        className={cn(
          "grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply",
        )}
      />
    </div>
  );
}

function artId(background: string, foreground: string) {
  return `${background.replace("#", "")}-${foreground.replace("#", "")}`;
}

function GarmentText({
  x,
  y,
  children,
  fill,
  size = 8,
  anchor = "start",
  opacity = 0.55,
}: {
  x: number;
  y: number;
  children: ReactNode;
  fill: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      opacity={opacity}
      textAnchor={anchor}
      fontFamily="var(--font-archivo), sans-serif"
      fontSize={size}
      fontWeight="600"
      letterSpacing="1.2"
    >
      {children}
    </text>
  );
}

export function ProductArt({
  artKind,
  background,
  foreground,
  name,
  className,
  minimal = false,
  decorative = false,
}: ProductArtProps) {
  const id = artId(background, foreground);

  return (
    <div className={cn("h-full w-full", className)}>
      <Frame
        background={background}
        foreground={foreground}
        label={name}
        showChrome={!minimal}
        decorative={decorative}
      >
        {artKind === "oversized-tee" || artKind === "graphic-tee" ? (
          <TeeArt
            kind={artKind}
            background={background}
            foreground={foreground}
            id={id}
          />
        ) : null}
        {artKind === "hoodie" ? (
          <HoodieArt foreground={foreground} id={id} />
        ) : null}
        {artKind === "sweatshirt" ? (
          <SweatshirtArt foreground={foreground} id={id} />
        ) : null}
        {artKind === "cap" ? <CapArt foreground={foreground} id={id} /> : null}
      </Frame>
    </div>
  );
}

function TeeArt({
  kind,
  background,
  foreground,
  id,
}: {
  kind: "oversized-tee" | "graphic-tee";
  background: string;
  foreground: string;
  id: string;
}) {
  const darkGarment = isDark(foreground);
  const seam = darkGarment ? PAPER : INK;
  const body =
    "M164 111C188 96 214 90 240 90C266 90 292 96 316 111L407 150L438 259L361 282L340 230L350 520L130 520L140 230L119 282L42 259L73 150Z";

  return (
    <g>
      <ellipse cx="240" cy="528" rx="134" ry="12" fill="#000" opacity="0.14" />
      <path d={body} fill={foreground} />
      <path d={body} fill={`url(#art-light-${id})`} opacity="0.55" />
      <path
        d="M190 104C210 137 270 137 290 104C274 94 206 94 190 104Z"
        fill={background}
        opacity="0.92"
      />
      <path
        d="M190 104C210 137 270 137 290 104"
        fill="none"
        stroke={seam}
        strokeWidth="1.4"
        opacity="0.4"
      />
      <path
        d="M164 111C190 139 201 161 204 197M316 111C290 139 279 161 276 197"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.22"
      />
      <path
        d="M143 230C146 277 150 350 147 385M337 230C334 277 330 350 333 385"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.22"
      />
      <path
        d="M161 251C201 270 279 271 320 249M169 320C193 333 275 337 311 318"
        fill="none"
        stroke={seam}
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M184 354C191 396 191 452 184 504M294 339C301 393 300 452 293 504M216 383C219 426 218 466 214 514"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.16"
      />
      <path
        d="M130 505H350"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.28"
      />
      <path d="M338 488H357V514H338Z" fill={ACCENT} opacity="0.92" />
      <GarmentText
        x={344}
        y={503}
        fill={INK}
        size={5.5}
        anchor="middle"
        opacity={0.9}
      >
        LT
      </GarmentText>
      <path
        d="M42 259L119 282L140 230"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.22"
      />
      <path
        d="M438 259L361 282L340 230"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.22"
      />

      {kind === "graphic-tee" ? (
        <g>
          <rect
            x="154"
            y="258"
            width="172"
            height="166"
            fill="none"
            stroke={PAPER}
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle
            cx="240"
            cy="339"
            r="61"
            fill="none"
            stroke={PAPER}
            strokeWidth="1"
            opacity="0.82"
          />
          <path
            d="M181 371C199 316 219 385 240 326C256 281 275 328 298 306C309 296 314 300 319 311"
            fill="none"
            stroke={ACCENT}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <GarmentText
            x={240}
            y={346}
            fill={PAPER}
            size={15}
            anchor="middle"
            opacity={0.95}
          >
            LOW TIDE
          </GarmentText>
          <GarmentText
            x={240}
            y={359}
            fill={PAPER}
            size={5.5}
            anchor="middle"
            opacity={0.65}
          >
            COLOMBO / SS26
          </GarmentText>
          <path
            d="M215 380H265"
            stroke={PAPER}
            strokeWidth="0.8"
            opacity="0.6"
          />
        </g>
      ) : null}
    </g>
  );
}

function HoodieArt({ foreground, id }: { foreground: string; id: string }) {
  const seam = isDark(foreground) ? PAPER : INK;

  return (
    <g>
      <ellipse cx="240" cy="531" rx="137" ry="13" fill="#000" opacity="0.18" />
      <path
        d="M171 172C145 145 154 98 240 91C326 98 335 145 309 172C280 194 200 194 171 172Z"
        fill={foreground}
      />
      <path
        d="M191 159C193 122 287 122 289 159C270 182 210 182 191 159Z"
        fill="#0b0b0a"
        opacity="0.62"
      />
      <path
        d="M191 159C212 184 268 184 289 159"
        fill="none"
        stroke={seam}
        strokeWidth="1.3"
        opacity="0.3"
      />
      <path
        d="M171 173C201 151 279 151 309 173L405 213L432 327L354 351L335 307L345 520L135 520L145 307L126 351L48 327L75 213Z"
        fill={foreground}
      />
      <path
        d="M171 173C201 151 279 151 309 173L405 213L432 327L354 351L335 307L345 520L135 520L145 307L126 351L48 327L75 213Z"
        fill={`url(#art-light-${id})`}
        opacity="0.48"
      />
      <path
        d="M173 171C193 204 215 220 240 228C265 220 287 204 307 171"
        fill="none"
        stroke={seam}
        strokeWidth="1"
        opacity="0.24"
      />
      <path
        d="M160 195C176 241 181 287 177 324M320 195C304 241 299 287 303 324"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.2"
      />
      <path
        d="M135 500H345M139 508V520M155 505V520M171 505V520M187 505V520M203 505V520M219 505V520M235 505V520M251 505V520M267 505V520M283 505V520M299 505V520M315 505V520M331 505V520M343 505V520"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.2"
      />
      <path d="M135 500H345V520H135Z" fill="#0c0c0b" opacity="0.55" />
      <path
        d="M164 361C203 380 277 380 316 361C318 405 316 448 309 472C276 484 204 484 171 472C164 445 162 405 164 361Z"
        fill="#000"
        opacity="0.1"
      />
      <path
        d="M164 361C203 380 277 380 316 361C318 405 316 448 309 472C276 484 204 484 171 472C164 445 162 405 164 361Z"
        fill="none"
        stroke={seam}
        strokeWidth="1"
        opacity="0.24"
      />
      <path
        d="M223 172C220 220 219 261 219 303C219 312 224 318 230 318C236 318 239 313 238 307C235 265 234 224 237 178M257 172C261 219 262 258 262 301C262 311 257 317 251 317C245 317 242 312 243 306C246 265 246 225 243 178"
        fill="none"
        stroke={seam}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.84"
      />
      <path
        d="M230 318V325M251 318V325"
        stroke={ACCENT}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M161 248C171 251 180 253 190 254"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.4"
        opacity="0.9"
      />
      <GarmentText x={168} y={267} fill={seam} size={5.5} opacity={0.45}>
        LT / 01
      </GarmentText>
      <path
        d="M48 327L126 351L145 307M432 327L354 351L335 307"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.18"
      />
    </g>
  );
}

function SweatshirtArt({ foreground, id }: { foreground: string; id: string }) {
  const seam = isDark(foreground) ? PAPER : INK;

  return (
    <g>
      <ellipse cx="240" cy="532" rx="133" ry="12" fill="#000" opacity="0.14" />
      <path
        d="M174 171C198 151 282 151 306 171L404 213L428 330L354 351L337 308L345 520L135 520L143 308L126 351L52 330L76 213Z"
        fill={foreground}
      />
      <path
        d="M174 171C198 151 282 151 306 171L404 213L428 330L354 351L337 308L345 520L135 520L143 308L126 351L52 330L76 213Z"
        fill={`url(#art-light-${id})`}
        opacity="0.7"
      />
      <path
        d="M194 166C215 197 265 197 286 166"
        fill="none"
        stroke={seam}
        strokeWidth="13"
        opacity="0.18"
      />
      <path
        d="M199 168C218 194 262 194 281 168"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.34"
      />
      <path
        d="M202 173C182 213 156 269 143 309M278 173C298 213 324 269 337 309"
        fill="none"
        stroke={seam}
        strokeWidth="1.1"
        opacity="0.3"
      />
      <path
        d="M174 251C211 269 270 269 307 251M180 360C206 374 273 375 302 357"
        fill="none"
        stroke={seam}
        strokeWidth="0.9"
        opacity="0.18"
      />
      <path
        d="M169 422C194 434 288 436 313 420"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.18"
      />
      <path d="M135 500H345V520H135Z" fill="#000" opacity="0.08" />
      <path
        d="M135 500H345M148 502V520M164 502V520M180 502V520M196 502V520M212 502V520M228 502V520M244 502V520M260 502V520M276 502V520M292 502V520M308 502V520M324 502V520M340 502V520"
        fill="none"
        stroke={seam}
        strokeWidth="0.7"
        opacity="0.2"
      />
      <path
        d="M53 309L65 326L73 317L82 334L93 323L101 340L114 330L126 349L143 308"
        fill="none"
        stroke={seam}
        strokeWidth="0.65"
        opacity="0.2"
      />
      <path
        d="M427 309L415 326L407 317L398 334L387 323L379 340L366 330L354 349L337 308"
        fill="none"
        stroke={seam}
        strokeWidth="0.65"
        opacity="0.2"
      />
      <path
        d="M170 354C201 367 280 367 311 353"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.14"
      />
      <path d="M160 469H179V481H160Z" fill={ACCENT} opacity="0.92" />
      <GarmentText
        x={169.5}
        y={477}
        fill={INK}
        size={4.5}
        anchor="middle"
        opacity={0.9}
      >
        LT
      </GarmentText>
      <GarmentText
        x={251}
        y={315}
        fill={seam}
        size={5}
        anchor="middle"
        opacity={0.38}
      >
        LOW TIDE / STUDY 04
      </GarmentText>
    </g>
  );
}

function CapArt({ foreground, id }: { foreground: string; id: string }) {
  const seam = isDark(foreground) ? PAPER : INK;

  return (
    <g>
      <ellipse cx="240" cy="492" rx="157" ry="16" fill="#000" opacity="0.34" />
      <path
        d="M116 355C110 253 163 188 240 188C317 188 370 253 364 355C324 373 282 381 240 381C198 381 156 373 116 355Z"
        fill={foreground}
      />
      <path
        d="M116 355C110 253 163 188 240 188C317 188 370 253 364 355C324 373 282 381 240 381C198 381 156 373 116 355Z"
        fill={`url(#art-light-${id})`}
        opacity="0.45"
      />
      <path
        d="M240 189V372M173 210C159 263 155 318 162 359M307 210C321 263 325 318 318 359"
        fill="none"
        stroke={seam}
        strokeWidth="1"
        opacity="0.24"
      />
      <path
        d="M155 318C185 333 294 333 325 318"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.15"
      />
      <ellipse
        cx="240"
        cy="190"
        rx="7"
        ry="4"
        fill={foreground}
        stroke={seam}
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
      <g fill="none" stroke={seam} strokeWidth="0.8" opacity="0.38">
        <circle cx="197" cy="267" r="3.1" />
        <circle cx="283" cy="267" r="3.1" />
        <circle cx="170" cy="314" r="2.4" />
        <circle cx="310" cy="314" r="2.4" />
      </g>
      <g>
        <path
          d="M205 315C214 298 266 298 275 315"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M215 308L210 301M265 308L270 301"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <GarmentText
          x={240}
          y={331}
          fill={seam}
          size={7}
          anchor="middle"
          opacity={0.66}
        >
          LOW TIDE
        </GarmentText>
      </g>
      <path
        d="M91 345C112 421 172 467 240 467C308 467 368 421 389 345C355 381 305 400 240 400C175 400 125 381 91 345Z"
        fill={foreground}
      />
      <path
        d="M91 345C112 421 172 467 240 467C308 467 368 421 389 345C355 381 305 400 240 400C175 400 125 381 91 345Z"
        fill="#000"
        opacity="0.16"
      />
      <path
        d="M91 345C112 421 172 467 240 467C308 467 368 421 389 345"
        fill="none"
        stroke={seam}
        strokeWidth="1"
        opacity="0.22"
      />
      <path
        d="M119 377C176 408 303 408 361 377M137 403C190 429 291 429 344 402"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.18"
      />
      <path
        d="M358 363C371 376 377 390 379 404"
        fill="none"
        stroke={seam}
        strokeWidth="0.8"
        opacity="0.22"
      />
      <path d="M350 373L365 367L370 381L355 387Z" fill={ACCENT} opacity="0.9" />
      <GarmentText
        x={454}
        y={520}
        fill={seam}
        size={5.5}
        anchor="end"
        opacity={0.38}
      >
        ONE SIZE / ADJUSTABLE
      </GarmentText>
    </g>
  );
}
