import InputFile from "@/components/ui/InputFile"
import { ICategory } from "@/types/Category"
import { Button, Card, CardBody, CardHeader, Input, Skeleton, Textarea } from "@nextui-org/react"

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory } = props
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Kategori</h1>
        <p className="w-full text-small text-default-400">Atur ikon kategori</p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => { }}>
          <Skeleton
            isLoaded={!!dataCategory?.name}
            className="rounded-lg"
          >
            <Input
              type="text"
              className="mt-2"
              label="Name"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.name}
            >

            </Input>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory?.description}
            className="rounded-lg"
          >
            <Textarea
              className="mt-2"
              label="Deskripsi"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.description}
            >

            </Textarea>
          </Skeleton>
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
          >Simpan Perubahan</Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default InfoTab