import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"


type Props = {
    setValue: (a: number | null) => void
}

export function DividendFilter({ setValue }: Props) {
    return (
        <NativeSelect
            className="bg-primary-dark text-white border-white"
            onChange={(e) => {
                const val = e.target.value
                setValue(val ? Number(val) : null)
            }}
        >
            <NativeSelectOption value="">últ. Proventos</NativeSelectOption>
            <NativeSelectOption value="1">Há 1 mês</NativeSelectOption>
            <NativeSelectOption value="5">Há 5 meses</NativeSelectOption>
            <NativeSelectOption value="12">Há 1 ano</NativeSelectOption>
        </NativeSelect>
    )
}
